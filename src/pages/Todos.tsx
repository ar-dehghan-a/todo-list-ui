import {Typography} from 'antd'
import {useTranslation} from 'react-i18next'

const Todos = () => {
  const {t} = useTranslation()

  return (
    <div>
      <Typography.Title>{t('sidebar.todos')}</Typography.Title>
    </div>
  )
}

export default Todos
