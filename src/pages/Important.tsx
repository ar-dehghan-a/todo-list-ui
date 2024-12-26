import {Typography} from 'antd'
import {useTranslation} from 'react-i18next'

const Important = () => {
  const {t} = useTranslation()

  return (
    <div>
      <Typography.Title>{t('sidebar.important')}</Typography.Title>
    </div>
  )
}

export default Important
