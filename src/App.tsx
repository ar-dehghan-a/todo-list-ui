import React from 'react'
import {ConfigProvider as AntProvider, theme} from 'antd'
import {ThemeProvider as EmotionProvider} from '@emotion/react'
import {themeConfig} from './config/theme'
import AppRouter from './routes/AppRouter'
import {useAppSelector} from './store'

import enUS from 'antd/locale/en_US'
import faIR from 'antd/locale/fa_IR'
import {useTranslation} from 'react-i18next'

const App: React.FC = () => {
  const {i18n} = useTranslation()
  const {token} = theme.useToken()
  const darkMode = useAppSelector(state => state.theme.darkMode)

  return (
    <AntProvider
      locale={i18n.language === 'fa' ? faIR : enUS}
      theme={{...themeConfig, algorithm: darkMode ? theme.darkAlgorithm : theme.compactAlgorithm}}
    >
      <EmotionProvider theme={token}>
        <AppRouter />
      </EmotionProvider>
    </AntProvider>
  )
}

export default App
