import {useState} from 'react'
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
  const [localIsCompleted, setLocalIsCompleted] = useState(isCompleted)
  const [localIsImportant, setLocalIsImportant] = useState(isImportant)

  const {mutate: toggleCompletedTodo} = useToggleCompletedTodo()
  const {mutate: toggleImportantTodo} = useToggleImportantTodo()

  const handleCheckboxChange = () => {
    setLocalIsCompleted(!localIsCompleted)
    toggleCompletedTodo(id, {
      onError: () => setLocalIsCompleted(isCompleted),
    })
  }

  const handleStarButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLocalIsImportant(!localIsImportant)
    toggleImportantTodo(id, {
      onError: () => setLocalIsImportant(isImportant),
    })
  }

  const handleContainerClick = () => dispatch(openDrawer(id))

  return (
    <Container onClick={handleContainerClick}>
      <Checkbox
        checked={localIsCompleted}
        onClick={e => e.stopPropagation()}
        onChange={handleCheckboxChange}
      />
      <Title>{title}</Title>

      <StarButton type="link" onClick={handleStarButtonClick}>
        {localIsImportant ? <StarFilled /> : <StarOutlined />}
      </StarButton>
    </Container>
  )
}

export default TodoItem
