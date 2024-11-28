import React from 'react'
import {Typography} from 'antd'
import {useTranslation} from 'react-i18next'

const Home: React.FC = () => {
  const {t} = useTranslation()

  return (
    <div>
      <Typography.Title>{t('welcome')}</Typography.Title>
      <Typography.Paragraph>{t('description')}</Typography.Paragraph>
    </div>
  )
}

export default Home
