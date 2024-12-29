import {Todo} from '..'

// Types
import {TodoItem} from '@/@types/todo'

interface TodoListProps {
  todos: TodoItem[]
  onToggle: (id: number) => void
  onRemove: (id: number) => void
}

const TodoList = ({todos, onToggle, onRemove}: TodoListProps) => {
  return (
    <div>
      {todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onRemove={() => onRemove(todo.id)}
        />
      ))}
    </div>
  )
}

export default TodoList
