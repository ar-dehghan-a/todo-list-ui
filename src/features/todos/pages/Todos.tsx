import {useTranslation} from 'react-i18next'
import {useTodos} from '../services'

// Components
import {Page} from '@/features/app'
import TodoList from '../components/TodoList'
import AddTodo from '../components/AddTodo'

// Icons
import {HomeFilled} from '@ant-design/icons'

const Todos = () => {
  const {t} = useTranslation()
  const {data} = useTodos()
  const todos = data?.data || []

  return (
    <Page title={t('sidebar.todos')} Icon={<HomeFilled />}>
      <TodoList todos={todos} />

      <AddTodo />
    </Page>
  )
}

export default Todos
