import {LanguageOutlined} from '@/assets/icons'
import {useLanguage} from '@/hooks'
import {Button} from 'antd'
import {useTranslation} from 'react-i18next'

const SwitchLanguage = () => {
  const {t} = useTranslation()
  const {language, setLanguage} = useLanguage()

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fa' : 'en'
    setLanguage(newLanguage)
  }
  return (
    <Button color="default" variant="link" onClick={toggleLanguage}>
      <LanguageOutlined />
      {language === 'en' ? t('languages.persian') : t('languages.english')}
    </Button>
  )
}

export default SwitchLanguage
