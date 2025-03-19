import {ConfigProvider as AntProvider} from 'antd'
import {QueryClientProvider} from '@tanstack/react-query'
import {ThemeProvider} from '@emotion/react'
import {ErrorBoundary} from 'react-error-boundary'
import AppRouter from './routes/AppRouter'
import queryClient from './config/react-query'
import {darkThemeConfig, lightThemeConfig} from './config/theme'
import {useLanguage} from './hooks'
import {ServerError, useTheme, useThemeWatcher} from '@/features/app'

// Locales
import enUS from 'antd/locale/en_US'
import faIR from 'antd/locale/fa_IR'

// Styles
import GlobalStyles from './styles/GlobalStyles'

const App = () => {
  const {isDarkMode} = useTheme()
  const {language, dir} = useLanguage()

  useThemeWatcher()

  return (
    <QueryClientProvider client={queryClient}>
      <AntProvider
        locale={language === 'en' ? enUS : faIR}
        theme={{
          ...(isDarkMode ? darkThemeConfig : lightThemeConfig),
          cssVar: true,
        }}
      >
        <ThemeProvider theme={{dir, isDarkMode}}>
          <GlobalStyles />
          <ErrorBoundary FallbackComponent={ServerError}>
            <AppRouter />
          </ErrorBoundary>
        </ThemeProvider>
      </AntProvider>
    </QueryClientProvider>
  )
}

export default App
