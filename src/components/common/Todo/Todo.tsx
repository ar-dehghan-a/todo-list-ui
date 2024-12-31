import {useState} from 'react'
import {useToggleCompletedTodo, useToggleImportantTodo} from '@/services/todos'

// Components
import {Checkbox} from 'antd'
import {Container, StarButton, Title} from './Todo.style'

// Icons
import {StarFilled, StarOutlined} from '@ant-design/icons'

// Types
import {TodoItem} from '@/@types/todo'

interface TodoProps {
  todo: TodoItem
}

const Todo = ({todo: {id, title, isCompleted, isImportant}}: TodoProps) => {
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

  return (
    <Container onClick={() => console.log('Clicked')}>
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

export default Todo
