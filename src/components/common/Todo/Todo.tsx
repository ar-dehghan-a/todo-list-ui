import {TodoItem} from '@/@types/todo'

interface TodoProps {
  todo: TodoItem
  onToggle: () => void
  onRemove: () => void
}

const Todo = ({todo: {title, description, isCompleted}, onToggle}: TodoProps) => {
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <input type="checkbox" checked={isCompleted} onChange={onToggle} />
      <span style={{textDecoration: isCompleted ? 'line-through' : 'none', marginLeft: '8px'}}>
        {title} {description && ` - ${description}`}
      </span>
    </div>
  )
}

export default Todo
