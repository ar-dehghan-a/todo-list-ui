import {useEffect, useRef} from 'react'
import {useAppSelector} from '@/store'

const useThemeWatcher = (): void => {
  const themeMode = useAppSelector(state => state.theme.mode)
  const root = useRef(document.querySelector(':root'))

  useEffect(() => {
    const html = root.current
    if (html) {
      html.setAttribute('data-theme', themeMode)
      requestAnimationFrame(() => {
        html.removeAttribute('data-no-transition')
      })
    }
  }, [themeMode])
}

export default useThemeWatcher
