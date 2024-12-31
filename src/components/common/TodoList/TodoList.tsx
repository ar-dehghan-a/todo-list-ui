import {Todo} from '..'

// Types
import {TodoItem} from '@/@types/todo'

interface TodoListProps {
  todos: TodoItem[]
}

const TodoList = ({todos}: TodoListProps) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodoList
