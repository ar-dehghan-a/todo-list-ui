import {useGlobalMessage} from '@/hooks'
import {useAppDispatch} from '@/store'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {openDrawer} from '../../store/drawerSlice'

// Components
import {Button, Checkbox, Dropdown, Flex, Modal, Typography} from 'antd'
import {Container, StarButton, Title} from './TodoItem.style'

// Services
import {
  useDeleteTodo,
  useToggleCompletedTodo,
  useToggleImportantTodo,
} from '../../services/mutations'

// Icons
import {CircleOutlined} from '@/assets/icons'
import {CheckCircleFilled, DeleteOutlined, StarFilled, StarOutlined} from '@ant-design/icons'

// Types
import type {Todo} from '@/@types/todo'
import type {MenuProps} from 'antd'
import type {AxiosError} from 'axios'

interface TodoItemProps {
  todo: Todo
}

const TodoItem = ({todo: {id, title, isCompleted, isImportant}}: TodoItemProps) => {
  const {t} = useTranslation()
  const message = useGlobalMessage()
  const dispatch = useAppDispatch()
  const [isDeleting, setIsDeleting] = useState(false)

  const {mutate: toggleCompletedTodo} = useToggleCompletedTodo()
  const {mutate: toggleImportantTodo} = useToggleImportantTodo()
  const {mutate: deleteTodo, isPending} = useDeleteTodo()

  const handleCheckboxChange = () => toggleCompletedTodo(id)

  const handleStarButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleImportantTodo(id)
  }

  const handleContainerClick = () => dispatch(openDrawer(id))

  const handleCancel = () => setIsDeleting(false)

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

  const items: MenuProps['items'] = [
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
  ]

  return (
    <>
      <Dropdown menu={{items}} trigger={['contextMenu']} destroyPopupOnHide>
        <Container onClick={handleContainerClick}>
          <Checkbox
            checked={isCompleted}
            onClick={e => e.stopPropagation()}
            onChange={handleCheckboxChange}
          />

          <Title isCompleted={isCompleted}>{title}</Title>

          <StarButton type="link" onClick={handleStarButtonClick}>
            {isImportant ? <StarFilled /> : <StarOutlined />}
          </StarButton>
        </Container>
      </Dropdown>

      <Modal
        title={<Typography.Title level={4}>{t('todos.deleteTodo')}</Typography.Title>}
        open={isDeleting}
        onCancel={handleCancel}
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

          <Button onClick={handleCancel} disabled={isPending}>
            {t('actions.cancel')}
          </Button>
        </Flex>
      </Modal>
    </>
  )
}

export default TodoItem
