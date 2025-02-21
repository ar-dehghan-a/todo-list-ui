import {Typography} from 'antd'
import {useTranslation} from 'react-i18next'
import {useTodos} from '../services'

// Components
import TodoList from '../components/TodoList'

// Icons
import {HomeFilled} from '@ant-design/icons'

const Todos = () => {
  const {t} = useTranslation()
  const {data} = useTodos()
  const todos = data?.data || []

  return (
    <div>
      <Typography.Title level={2}>
        <HomeFilled style={{marginInlineEnd: '12px'}} />
        {t('sidebar.todos')}
      </Typography.Title>

      <TodoList todos={todos} />
    </div>
  )
}

export default Todos
