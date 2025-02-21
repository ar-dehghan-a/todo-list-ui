import {createSlice} from '@reduxjs/toolkit'

interface ThemeState {
  mode: 'light' | 'dark'
}

const defaultMode: 'light' | 'dark' =
  (localStorage.getItem('mode') as 'light' | 'dark') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

const initialState: ThemeState = {
  mode: defaultMode,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      localStorage.setItem('mode', state.mode)
    },
  },
})

export const {toggleTheme} = themeSlice.actions
export default themeSlice.reducer
