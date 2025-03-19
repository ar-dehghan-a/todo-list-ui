import {useTranslation} from 'react-i18next'
import type {LanguageCode} from '@/@types/common'

const useLanguage = (): {
  language: LanguageCode
  setLanguage: (locale: LanguageCode) => Promise<void>
  dir: 'ltr' | 'rtl'
  isRTL: boolean
} => {
  const {i18n} = useTranslation()

  const language = (i18n.language === 'en-US' ? 'en' : i18n.language) as LanguageCode

  const setLanguage = async (locale: LanguageCode) => {
    try {
      await i18n.changeLanguage(locale)
    } catch (error) {
      console.error('Failed to change language:', error)
    }
  }

  const dir = i18n.dir()
  const isRTL = i18n.dir() === 'rtl'

  return {
    language,
    setLanguage,
    dir,
    isRTL,
  }
}

export default useLanguage
