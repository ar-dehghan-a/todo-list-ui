import themeSlice, {toggleTheme} from './store/themeSlice'

// components
export {default as Page} from './components/Page'
export {default as SwitchLanguage} from './components/SwitchLanguage'
export {default as SwitchThemeMode} from './components/SwitchThemeMode'

// layouts
export {default as MainLayout} from './layouts/MainLayout'

// hooks
export {default as useTheme} from './hooks/useTheme'
export {default as useThemeWatcher} from './hooks/useThemeWatcher'

// store
export {themeSlice, toggleTheme}
