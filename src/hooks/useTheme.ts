import {useAppDispatch, useAppSelector} from '@/store'
import {setThemeMode} from '@/store/themeSlice'

const useTheme = () => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme)

  const isDarkMode = theme.mode === 'dark'

  const toggleThemeMode = () => {
    const newMode = theme.mode === 'dark' ? 'light' : 'dark'
    dispatch(setThemeMode(newMode))
  }

  return {theme, toggleThemeMode, isDarkMode}
}

export default useTheme
