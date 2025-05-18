import {useTranslation} from 'react-i18next'

// Services
import {useTodos} from '../services/queries'

// Components
import {Page} from '@/features/app'
import {Collapse, Empty} from 'antd'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'

// Icons
import {HomeFilled} from '@ant-design/icons'

const Todos = () => {
  const {t} = useTranslation()
  const {data} = useTodos()
  const todos = data || []

  const uncompletedTodos = todos.filter(todo => !todo.isCompleted)
  const completedTodos = todos.filter(todo => todo.isCompleted)

  return (
    <Page title={t('sidebar.todos')} Icon={<HomeFilled />}>
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

      <TodoList todos={uncompletedTodos} />

      {completedTodos.length > 0 && (
        <Collapse
          ghost
          bordered={false}
          defaultActiveKey={uncompletedTodos.length === 0 ? ['completed'] : []}
          items={[
            {
              key: 'completed',
              label: t('todos.Completed', {count: completedTodos.length}),
              children: <TodoList todos={completedTodos} />,
              styles: {
                header: {
                  display: 'inline-flex',
                  padding: '3px 10px',
                  margin: '10px 0px',
                  borderRadius: 6,
                  backgroundColor: 'var(--todo-item-body-bg)',
                },
                body: {padding: 0},
              },
            },
          ]}
        />
      )}

      <AddTodo />
    </Page>
  )
}

export default Todos
