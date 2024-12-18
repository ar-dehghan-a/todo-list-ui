import React from 'react'
import {ConfigProvider as AntProvider, theme} from 'antd'
import {useTranslation} from 'react-i18next'
import {themeConfig} from './config/theme'
import AppRouter from './routes/AppRouter'
import {useAppSelector} from './store'

// locales
import enUS from 'antd/locale/en_US'
import faIR from 'antd/locale/fa_IR'

// styles
import 'antd/dist/reset.css'

const App: React.FC = () => {
  const {i18n} = useTranslation()
  const darkMode = useAppSelector(state => state.theme.darkMode)

  return (
    <AntProvider
      locale={i18n.language === 'fa' ? faIR : enUS}
      theme={{...themeConfig, algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm}}
    >
      <AppRouter />
    </AntProvider>
  )
}

export default App
