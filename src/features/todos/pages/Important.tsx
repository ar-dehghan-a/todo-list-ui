import {useTranslation} from 'react-i18next'

// Services
import {useTodos} from '../services/queries'

// Components
import {Page} from '@/features/app'
import {Empty} from 'antd'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'

// Icons
import {StarFilled} from '@ant-design/icons'

const Important = () => {
  const {t} = useTranslation()
  const {data} = useTodos({isImportant: true})
  const important = data || []

  return (
    <Page title={t('sidebar.important')} Icon={<StarFilled />}>
      {important.length === 0 && (
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

      <TodoList todos={important || []} />
      <AddTodo createAsImportant />
    </Page>
  )
}

export default Important
