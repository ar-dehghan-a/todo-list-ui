import styled from '@emotion/styled'
import Todo from '../Todo'

// Types
import {TodoItem} from '@/@types/todo'

interface TodoListProps {
  todos: TodoItem[]
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const TodoList = ({todos}: TodoListProps) => {
  return (
    <Container>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </Container>
  )
}

export default TodoList
