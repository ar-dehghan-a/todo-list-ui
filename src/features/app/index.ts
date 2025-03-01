import themeSlice, {toggleTheme} from './store/themeSlice'

// components
export {default as Page} from './components/Page'

// layouts
export {default as MainLayout} from './layouts/MainLayout'

// hooks
export {default as useLanguage} from './hooks/useLanguage'
export {default as useTheme} from './hooks/useTheme'
export {default as useThemeWatcher} from './hooks/useThemeWatcher'

// store
export {themeSlice, toggleTheme}
