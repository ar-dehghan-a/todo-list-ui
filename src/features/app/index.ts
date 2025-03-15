import themeSlice, {toggleTheme} from './store/themeSlice'

// pages
export {default as NotFound} from './pages/NotFound'
export {default as ServerError} from './pages/ServerError'

// components
export {default as Page} from './components/Page'

// layouts
export {default as MainLayout} from './layouts/MainLayout'

// hooks
export {default as useTheme} from './hooks/useTheme'
export {default as useThemeWatcher} from './hooks/useThemeWatcher'

// store
export {themeSlice, toggleTheme}
