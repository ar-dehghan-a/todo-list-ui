import {Typography} from 'antd'
import {useTranslation} from 'react-i18next'

const Todos = () => {
  const {t} = useTranslation()

  return (
    <div>
      <Typography.Title>{t('welcome')}</Typography.Title>
      <Typography.Paragraph>{t('description')}</Typography.Paragraph>
    </div>
  )
}

export default Todos
