import styled from '@emotion/styled'
import {useTranslation} from 'react-i18next'

// Components
import {Empty} from 'antd'
import TodoItem from '../TodoItem'

// Types
import type {Todo} from '@/@types/todo'

interface TodoListProps {
  todos: Todo[]
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  gap: 6px;
  padding-bottom: 60px;
`

const TodoList = ({todos}: TodoListProps) => {
  const {t} = useTranslation()

  return (
    <Container>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}

      {todos.length === 0 && (
        <Empty
          style={{
            height: '40vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          description={t('todos.empty')}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </Container>
  )
}

export default TodoList
