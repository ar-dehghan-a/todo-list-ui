import React from 'react'
import {ConfigProvider as AntProvider} from 'antd'
import {ThemeProvider} from '@emotion/react'
import {useTranslation} from 'react-i18next'
import AppRouter from './routes/AppRouter'
import {darkThemeConfig, lightThemeConfig} from './config/theme'
import useTheme from './hooks/useTheme'

// locales
import enUS from 'antd/locale/en_US'
import faIR from 'antd/locale/fa_IR'

// styles
import 'antd/dist/reset.css'

const App: React.FC = () => {
  const {i18n} = useTranslation()
  const {isDarkMode} = useTheme()

  return (
    <AntProvider
      locale={i18n.language === 'fa' ? faIR : enUS}
      theme={{
        ...(isDarkMode ? darkThemeConfig : lightThemeConfig),
        cssVar: true,
      }}
    >
      <ThemeProvider theme={{dir: i18n.dir()}}>
        <AppRouter />
      </ThemeProvider>
    </AntProvider>
  )
}

export default App
