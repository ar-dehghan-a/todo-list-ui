import styled from '@emotion/styled'

// Components
import TodoItem from '../TodoItem'

// Types
import type {Todo} from '@/@types/todo'

interface TodoListProps {
  todos: Todo[]
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 64px;
`

const TodoList = ({todos}: TodoListProps) => {
  return (
    <Container>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </Container>
  )
}

export default TodoList
