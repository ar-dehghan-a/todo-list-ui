import {useTranslation} from 'react-i18next'

// Services
import {useTodos} from '../services/queries'

// Components
import {Page} from '@/features/app'
import TodoList from '../components/TodoList'
import AddTodo from '../components/AddTodo'

// Icons
import {StarFilled} from '@ant-design/icons'

const Important = () => {
  const {t} = useTranslation()
  const {data} = useTodos({isImportant: true})
  const important = data?.data || []

  return (
    <Page title={t('sidebar.important')} Icon={<StarFilled />}>
      <TodoList todos={important} />
      <AddTodo createAsImportant />
    </Page>
  )
}

export default Important
