import {useAppDispatch, useAppSelector} from '@/store'
import {toggleTheme} from '../store/themeSlice'

const useTheme = () => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme)

  const isDarkMode = theme.mode === 'dark'

  const toggleThemeMode = () => {
    dispatch(toggleTheme())
  }

  return {theme, toggleThemeMode, isDarkMode}
}

export default useTheme
