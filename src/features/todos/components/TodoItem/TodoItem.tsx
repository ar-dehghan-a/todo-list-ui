import {useAppDispatch} from '@/store'
import {openDrawer} from '../../store/drawerSlice'

// Components
import {Checkbox} from 'antd'
import {Container, StarButton, Title} from './TodoItem.style'

// Services
import {useToggleCompletedTodo, useToggleImportantTodo} from '../../services/mutations'

// Icons
import {StarFilled, StarOutlined} from '@ant-design/icons'

// Types
import type {Todo} from '@/@types/todo'

interface TodoItemProps {
  todo: Todo
}

const TodoItem = ({todo: {id, title, isCompleted, isImportant}}: TodoItemProps) => {
  const dispatch = useAppDispatch()

  const {mutate: toggleCompletedTodo} = useToggleCompletedTodo()
  const {mutate: toggleImportantTodo} = useToggleImportantTodo()

  const handleCheckboxChange = () => toggleCompletedTodo(id)

  const handleStarButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleImportantTodo(id)
  }

  const handleContainerClick = () => dispatch(openDrawer(id))

  return (
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
  )
}

export default TodoItem
