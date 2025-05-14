import {useLanguage} from '@/hooks'
import {useGlobalMessage} from '@/providers'
import {useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useNavigate} from 'react-router-dom'

// Components
import {Button, Checkbox, Dropdown, Flex, Modal, Space, Typography} from 'antd'
import {Container, DueDateWrapper, StarButton, Title} from './TodoItem.style'

// Services
import {
  useDeleteTodo,
  useToggleCompletedTodo,
  useToggleImportantTodo,
} from '../../services/mutations'

// Icons
import {CircleOutlined} from '@/assets/icons'
import {
  CalendarOutlined,
  CheckCircleFilled,
  DeleteOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons'

// Types
import type {Todo} from '@/@types/todo'
import type {MenuProps} from 'antd'
import type {AxiosError} from 'axios'

interface TodoItemProps {
  todo: Todo
}

const TodoItem = ({todo: {id, title, isCompleted, isImportant, dueDate}}: TodoItemProps) => {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const message = useGlobalMessage()
  const [isDeleting, setIsDeleting] = useState(false)
  const {isRTL} = useLanguage()

  const {mutate: toggleCompletedTodo} = useToggleCompletedTodo()
  const {mutate: toggleImportantTodo} = useToggleImportantTodo()
  const {mutate: deleteTodo, isPending} = useDeleteTodo()

  // Generate context menu items
  const contextMenuItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'important',
        label: isImportant ? t('todos.markAsNotImportant') : t('todos.markAsImportant'),
        icon: isImportant ? <StarOutlined /> : <StarFilled />,
        onClick: () => toggleImportantTodo(id),
      },
      {
        key: 'completed',
        label: isCompleted ? t('todos.markAsNotCompleted') : t('todos.markAsCompleted'),
        icon: isCompleted ? <CircleOutlined style={{fontSize: '15px'}} /> : <CheckCircleFilled />,
        onClick: () => toggleCompletedTodo(id),
      },
      {
        key: 'delete',
        label: t('todos.deleteTodo'),
        icon: <DeleteOutlined style={{color: 'var(--ant-color-error)'}} />,
        onClick: () => setIsDeleting(true),
      },
    ],
    [id, isImportant, isCompleted, t, toggleImportantTodo, toggleCompletedTodo]
  )

  // Calculate due date text
  const dueDateText = useMemo(() => {
    if (!dueDate) return null

    const newDueDate = new Date(dueDate)
    const today = new Date()
    const normalize = (date: Date) => date.setHours(0, 0, 0, 0)

    const diff = normalize(newDueDate) - normalize(today)

    if (diff === 0) return t('todos.today')
    if (diff === 86400000) return t('todos.tomorrow')
    if (diff === -86400000) return t('todos.yesterday')

    return newDueDate.toLocaleDateString(isRTL ? 'fa-IR' : 'en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }, [dueDate, isRTL, t])

  const handleCheckboxChange = () => toggleCompletedTodo(id)

  const handleStarButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleImportantTodo(id)
  }

  const handleCancelDelete = () => setIsDeleting(false)

  const handleDelete = () => {
    deleteTodo(id, {
      onSuccess: () => {
        message.success(t('todos.deleteTodoSuccess'))
      },
      onError: (error: unknown) => {
        const status = (error as AxiosError).response?.status
        if (status === 404) message.error(t('todos.deleteTodoNotFound'))
        else message.error(t('todos.deleteTodoError'))
      },
    })
    setIsDeleting(false)
  }

  return (
    <>
      <Dropdown menu={{items: contextMenuItems}} trigger={['contextMenu']} destroyPopupOnHide>
        <Container onClick={() => navigate(`/todos/${id}`)}>
          <Checkbox
            checked={isCompleted}
            onClick={e => e.stopPropagation()}
            onChange={handleCheckboxChange}
          />

          <Title isCompleted={isCompleted}>{title}</Title>

          {dueDateText && (
            <DueDateWrapper
              redColor={[t('todos.today'), t('todos.tomorrow'), t('todos.yesterday')].includes(
                dueDateText
              )}
            >
              <Space size={4}>
                <CalendarOutlined />
                <Typography.Text type="secondary">{dueDateText}</Typography.Text>
              </Space>
            </DueDateWrapper>
          )}

          <StarButton type="link" onClick={handleStarButtonClick}>
            {isImportant ? <StarFilled /> : <StarOutlined />}
          </StarButton>
        </Container>
      </Dropdown>

      <Modal
        title={<Typography.Title level={4}>{t('todos.deleteTodo')}</Typography.Title>}
        open={isDeleting}
        onCancel={handleCancelDelete}
        closeIcon={null}
        footer={null}
      >
        <Typography.Paragraph>
          {t('todos.deleteTodoConfirmationDescription', {title})}
        </Typography.Paragraph>

        <Flex gap={10} justify="center" align="center">
          <Button danger type="primary" onClick={handleDelete} loading={isPending}>
            {t('actions.delete')}
          </Button>

          <Button onClick={handleCancelDelete} disabled={isPending}>
            {t('actions.cancel')}
          </Button>
        </Flex>
      </Modal>
    </>
  )
}

export default TodoItem
