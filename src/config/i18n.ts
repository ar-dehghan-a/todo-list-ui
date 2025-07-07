import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from '@/locales/en/translation.json'
import fa from '@/locales/fa/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug:  false,
    resources: {
      en: {translation: en},
      fa: {translation: fa},
    },
    fallbackLng: 'en',
    interpolation: {escapeValue: false},
    react: {useSuspense: false},
  })

document.documentElement.setAttribute('lang', i18n.language)
document.documentElement.setAttribute('dir', i18n.dir())

i18n.on('languageChanged', lng => {
  document.documentElement.setAttribute('lang', lng)
  document.documentElement.setAttribute('dir', i18n.dir())
})

export default i18n
