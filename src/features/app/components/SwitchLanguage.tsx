import {LanguageOutlined} from '@/assets/icons'
import {useLanguage, useResponsive} from '@/hooks'
import {Button} from 'antd'
import {useTranslation} from 'react-i18next'

const SwitchLanguage = () => {
  const {t} = useTranslation()
  const {isMobile} = useResponsive()
  const {language, setLanguage} = useLanguage()

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fa' : 'en'
    setLanguage(newLanguage)
  }

  return (
    <Button
      size="small"
      variant="link"
      color="default"
      onClick={toggleLanguage}
      style={{fontSize: isMobile ? '12px' : '14px'}}
    >
      <LanguageOutlined style={{fontSize: isMobile ? '20px' : '24px'}} />
      {language === 'en' ? t('languages.persian') : t('languages.english')}
    </Button>
  )
}

export default SwitchLanguage
