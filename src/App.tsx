import React from 'react'
import {ConfigProvider as AntProvider} from 'antd'
import {ThemeProvider} from '@emotion/react'
import AppRouter from './routes/AppRouter'
import {darkThemeConfig, lightThemeConfig} from './config/theme'
import useTheme from './hooks/useTheme'
import {useLanguage} from './hooks/useLanguage'

// locales
import enUS from 'antd/locale/en_US'
import faIR from 'antd/locale/fa_IR'

// styles
import 'antd/dist/reset.css'

const App: React.FC = () => {
  const {isDarkMode} = useTheme()
  const {language, dir} = useLanguage()

  return (
    <AntProvider
      locale={language === 'en' ? enUS : faIR}
      theme={{
        ...(isDarkMode ? darkThemeConfig : lightThemeConfig),
        cssVar: true,
      }}
    >
      <ThemeProvider theme={{dir}}>
        <AppRouter />
      </ThemeProvider>
    </AntProvider>
  )
}

export default App
