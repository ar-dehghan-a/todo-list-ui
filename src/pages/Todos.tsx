import {Typography} from 'antd'
import {useTranslation} from 'react-i18next'
import {useTodos} from '@/services/todos'

// components
import {TodoList} from '@/components/common'

// icons
import {HomeOutlined} from '@ant-design/icons'

const Todos = () => {
  const {t} = useTranslation()
  const {data} = useTodos()
  const todos = data?.data || []

  return (
    <div>
      <Typography.Title>
        <HomeOutlined style={{fontSize: '32px', marginInlineEnd: '16px'}} />
        {t('sidebar.todos')}
      </Typography.Title>

      <TodoList todos={todos} onRemove={id => console.log(id)} onToggle={id => console.log(id)} />
    </div>
  )
}

export default Todos
