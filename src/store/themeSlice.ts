import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

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
    setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload
      localStorage.setItem('mode', JSON.stringify(state.mode))
    },
  },
})

export const {setThemeMode} = themeSlice.actions
export default themeSlice.reducer
