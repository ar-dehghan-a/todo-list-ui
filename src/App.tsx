import {ServerError, useTheme, useThemeWatcher} from '@/features/app'
import {ThemeProvider} from '@emotion/react'
import {QueryClientProvider} from '@tanstack/react-query'
import {ConfigProvider as AntProvider} from 'antd'
import {ErrorBoundary} from 'react-error-boundary'
import queryClient from './config/react-query'
import {darkThemeConfig, lightThemeConfig} from './config/theme'
import {GlobalMessageProvider, useLanguage} from './hooks'
import AppRouter from './routes/AppRouter'

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
            <GlobalMessageProvider>
              <AppRouter />
            </GlobalMessageProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </AntProvider>
    </QueryClientProvider>
  )
}

export default App
