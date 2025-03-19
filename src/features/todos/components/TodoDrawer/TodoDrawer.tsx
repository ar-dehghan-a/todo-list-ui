import {useEffect, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useAppDispatch, useAppSelector} from '@/store'
import {closeDrawer} from '../../store/drawerSlice'
import {useLanguage} from '@/hooks'

// Components
import {Button, Input, message, Popconfirm} from 'antd'
import {Drawer, TitleWrapper} from './TodoDrawer.style'

// Services
import {useTodoById} from '../../services/queries'
import {
  useUpdateTodo,
  useToggleCompletedTodo,
  useToggleImportantTodo,
  useDeleteTodo,
} from '../../services/mutations'

// Icons
import {CheckCircleFilled, DeleteOutlined, StarFilled, StarOutlined} from '@ant-design/icons'
import {CircleOutlined, PanelCloseOutlined} from '@/assets/icons'

// Types
import type {TextAreaRef} from 'antd/es/input/TextArea'

const TodoDrawer = () => {
  const {t} = useTranslation()
  const {isRTL} = useLanguage()
  const dispatch = useAppDispatch()
  const {isOpen, selectedTodoId} = useAppSelector(state => state.drawer)

  const titleRef = useRef<TextAreaRef>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)

  const {data} = useTodoById(selectedTodoId || 0)
  const {mutate: updateTodo} = useUpdateTodo(selectedTodoId || 0)
  const {mutate: toggleImportantTodo} = useToggleImportantTodo()
  const {mutate: toggleCompletedTodo} = useToggleCompletedTodo()
  const {mutate: deleteTodo, isPending: isDeleting} = useDeleteTodo()

  const todo = data?.data

  const handleCloseDrawer = () => dispatch(closeDrawer())
  const handleOpenConfirm = () => setOpenDeleteConfirm(true)
  const handleCancelConfirm = () => setOpenDeleteConfirm(false)

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)

  const handleTitleClick = () => setIsEditing(true)

  const handleTitleBlur = () => {
    if (title === '') setTitle(todo?.title || '')
    else if (title !== todo?.title) updateTodo({title})
    setIsEditing(false)
  }

  const handleNoteBlur = () => {
    if (note === '') setNote(todo?.note || '')
    else if (note !== todo?.note) updateTodo({note})
  }

  const handleDelete = () =>
    deleteTodo(selectedTodoId || 0, {
      onSuccess: () => {
        handleCancelConfirm()
        handleCloseDrawer()
        message.success(t('todos.edit.deleteTodoSuccess'))
      },
    })

  useEffect(() => {
    setTitle(todo?.title || '')
    setNote(todo?.note || '')
  }, [todo])

  useEffect(() => {
    if (isEditing && titleRef.current?.resizableTextArea) {
      titleRef.current.focus()
      const length = titleRef.current.resizableTextArea.textArea.value.length
      titleRef.current.resizableTextArea.textArea.setSelectionRange(length, length)
    }
  }, [isEditing])

  const renderFooter = () => (
    <>
      <Button
        type="text"
        onClick={handleCloseDrawer}
        icon={<PanelCloseOutlined style={{fontSize: '20px', rotate: isRTL ? '180deg' : '0deg'}} />}
      />

      <div className="ant-drawer-footer-text">
        {todo?.createdAt &&
          `${t('todos.edit.createdAt', {
            date: new Date(todo.createdAt).toLocaleDateString(isRTL ? 'fa-IR' : 'en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            }),
          })}`}
      </div>

      <Popconfirm
        title={t('todos.edit.deleteTodoConfirmationTitle')}
        description={t('todos.edit.deleteTodoConfirmationDescription')}
        open={openDeleteConfirm}
        onConfirm={handleDelete}
        onCancel={handleCancelConfirm}
        okText={t('actions.delete')}
        okButtonProps={{loading: isDeleting, type: 'primary', danger: true}}
        cancelText={t('actions.cancel')}
        cancelButtonProps={{disabled: isDeleting}}
      >
        <Button
          danger
          type="text"
          onClick={handleOpenConfirm}
          icon={<DeleteOutlined style={{fontSize: '18px'}} />}
        />
      </Popconfirm>
    </>
  )

  return (
    <Drawer
      closeIcon={false}
      destroyOnClose
      open={isOpen}
      onClose={handleCloseDrawer}
      placement={isRTL ? 'left' : 'right'}
      footer={renderFooter()}
    >
      <div>
        <TitleWrapper>
          <Button
            type="text"
            style={{flexShrink: 0}}
            onClick={() => toggleCompletedTodo(selectedTodoId || 0)}
            icon={
              todo?.isCompleted ? (
                <CheckCircleFilled style={{fontSize: '20px', color: 'var(--ant-color-primary)'}} />
              ) : (
                <CircleOutlined style={{fontSize: '22px'}} />
              )
            }
          />

          <div className="title">
            <div className="content" draggable={false} ref={contentRef}>
              {isEditing ? (
                <div className="edit">
                  <Input.TextArea
                    ref={titleRef}
                    value={title}
                    autoSize
                    className="content-textarea"
                    onChange={handleTitleChange}
                    onBlur={handleTitleBlur}
                  />
                </div>
              ) : (
                <span onClick={handleTitleClick}>{title}</span>
              )}
            </div>
          </div>

          <Button
            type="text"
            style={{flexShrink: 0}}
            onClick={() => toggleImportantTodo(selectedTodoId || 0)}
            icon={
              todo?.isImportant ? (
                <StarFilled style={{color: 'var(--ant-color-link)', fontSize: '20px'}} />
              ) : (
                <StarOutlined style={{color: 'var(--ant-color-link)', fontSize: '20px'}} />
              )
            }
          />
        </TitleWrapper>

        <br />

        <Input.TextArea
          value={note}
          onChange={handleNoteChange}
          onBlur={handleNoteBlur}
          placeholder={t('todos.edit.notePlaceholder')}
          autoSize={{minRows: 3, maxRows: 5}}
          showCount
          maxLength={250}
        />
      </div>
    </Drawer>
  )
}

export default TodoDrawer
