import {lazy} from 'react'
import {ConfigProvider as AntProvider} from 'antd'
import {ThemeProvider} from '@emotion/react'
import {QueryClientProvider} from '@tanstack/react-query'
import {ErrorBoundary} from 'react-error-boundary'
import AppRouter from './routes/AppRouter'
import {darkThemeConfig, lightThemeConfig} from './config/theme'
import queryClient from './config/react-query'
import {useLanguage, useTheme} from './hooks'

const ServerError = lazy(() => import('./pages/ServerError'))

// Locales
import enUS from 'antd/locale/en_US'
import faIR from 'antd/locale/fa_IR'

// Styles
import 'antd/dist/reset.css'

const App = () => {
  const {isDarkMode} = useTheme()
  const {language, dir} = useLanguage()

  return (
    <QueryClientProvider client={queryClient}>
      <AntProvider
        locale={language === 'en' ? enUS : faIR}
        theme={{
          ...(isDarkMode ? darkThemeConfig : lightThemeConfig),
          cssVar: true,
        }}
      >
        <ThemeProvider theme={{dir}}>
          <ErrorBoundary FallbackComponent={ServerError}>
            <AppRouter />
          </ErrorBoundary>
        </ThemeProvider>
      </AntProvider>
    </QueryClientProvider>
  )
}

export default App
