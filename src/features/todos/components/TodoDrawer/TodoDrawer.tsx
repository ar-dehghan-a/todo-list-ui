import {useLanguage} from '@/hooks'
import {useGlobalMessage} from '@/providers'
import {useAppDispatch, useAppSelector} from '@/store'
import dayjs from 'dayjs'
import {useEffect, useRef, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useNavigate, useParams} from 'react-router-dom'
import {closeDrawer, openDrawer} from '../../store/drawerSlice'

// Components
import {Button, DatePicker, Flex, Input, Popconfirm} from 'antd'
import {Drawer, TitleWrapper} from './TodoDrawer.style'

// Services
import {
  useDeleteTodo,
  useToggleCompletedTodo,
  useToggleImportantTodo,
  useUpdateTodo,
} from '../../services/mutations'
import {useTodoById} from '../../services/queries'

// Icons
import {CircleOutlined, PanelCloseOutlined} from '@/assets/icons'
import {CheckCircleFilled, DeleteOutlined, StarFilled, StarOutlined} from '@ant-design/icons'

// Types
import type {DatePickerProps} from 'antd'
import type {TextAreaRef} from 'antd/es/input/TextArea'

const TodoDrawer = () => {
  const {t} = useTranslation()
  const {id} = useParams()
  const navigate = useNavigate()
  const message = useGlobalMessage()
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
  const todo = data?.data

  const {mutate: updateTodo} = useUpdateTodo(selectedTodoId || 0)
  const {mutate: toggleImportantTodo} = useToggleImportantTodo()
  const {mutate: toggleCompletedTodo} = useToggleCompletedTodo()
  const {mutate: deleteTodo, isPending: isDeleting} = useDeleteTodo()

  const handleOpenDrawer = (id: number) => dispatch(openDrawer(id))
  const handleCloseDrawer = () => dispatch(closeDrawer())

  const handleOpenConfirm = () => setOpenDeleteConfirm(true)
  const handleCancelConfirm = () => setOpenDeleteConfirm(false)

  const handleTitleClick = () => setIsEditing(true)
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value)
  const handleTitleBlur = () => {
    if (title === '') setTitle(todo?.title || '')
    else if (title !== todo?.title) updateTodo({title})
    setIsEditing(false)
  }

  const handleDateChange: DatePickerProps['onChange'] = date => {
    updateTodo({dueDate: date.toISOString()})
  }

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)
  const handleNoteBlur = () => {
    if (note === '') setNote(todo?.note || '')
    else if (note !== todo?.note) updateTodo({note})
  }

  const handleDeleteTodo = () => {
    if (!selectedTodoId) return
    deleteTodo(selectedTodoId, {
      onSuccess: () => {
        handleCancelConfirm()
        handleCloseDrawer()
        message.success(t('todos.edit.deleteTodoSuccess'))
      },
    })
  }

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

  useEffect(() => {
    const todoId = Number(id)
    if (!isNaN(todoId)) handleOpenDrawer(todoId)
    else handleCloseDrawer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const renderFooter = () => (
    <>
      <Button
        type="text"
        onClick={() => navigate('/todos')}
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
        onConfirm={handleDeleteTodo}
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
      destroyOnHidden
      open={isOpen}
      onClose={() => navigate('/todos')}
      placement={isRTL ? 'left' : 'right'}
      footer={renderFooter()}
    >
      <div>
        <TitleWrapper isCompleted={todo?.isCompleted || false}>
          <Button
            type="text"
            style={{flexShrink: 0}}
            onClick={() => selectedTodoId && toggleCompletedTodo(selectedTodoId)}
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
            onClick={() => selectedTodoId && toggleImportantTodo(selectedTodoId)}
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

        <Flex gap={8} vertical>
          <DatePicker
            value={todo?.dueDate ? dayjs(todo?.dueDate) : null}
            onChange={handleDateChange}
          />

          <Input.TextArea
            value={note}
            onChange={handleNoteChange}
            onBlur={handleNoteBlur}
            placeholder={t('todos.edit.notePlaceholder')}
            autoSize={{minRows: 3, maxRows: 5}}
            showCount
            maxLength={250}
          />
        </Flex>
      </div>
    </Drawer>
  )
}

export default TodoDrawer
