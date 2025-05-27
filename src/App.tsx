import {useTheme, useThemeWatcher} from '@/features/app'
import {ThemeProvider} from '@emotion/react'
import {ConfigProvider as AntProvider} from 'antd'
import {lazy} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {darkThemeConfig, lightThemeConfig} from './config/theme'
import withLoading from './hocs/withLoading.hoc'
import {useLanguage, useServiceWorker} from './hooks'
import {GlobalMessageProvider} from './providers'
import AppRouter from './routes/AppRouter'

// Locales
import enUS from 'antd/locale/en_US'
import faIR from 'antd/locale/fa_IR'

// Styles
import GlobalStyles from './styles/GlobalStyles'

const ServerError = lazy(() => import('@/features/app/pages/ServerError'))
const ServerErrorPage = withLoading(ServerError)

const App = () => {
  const {isDarkMode} = useTheme()
  const {language, dir} = useLanguage()

  useThemeWatcher()
  useServiceWorker()

  return (
    <AntProvider
      locale={language === 'en' ? enUS : faIR}
      theme={{
        ...(isDarkMode ? darkThemeConfig : lightThemeConfig),
        cssVar: true,
      }}
    >
      <ThemeProvider theme={{dir, isDarkMode}}>
        <GlobalStyles />
        <ErrorBoundary FallbackComponent={ServerErrorPage}>
          <GlobalMessageProvider>
            <AppRouter />
          </GlobalMessageProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </AntProvider>
  )
}

export default App
