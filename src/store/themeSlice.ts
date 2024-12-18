import {createSlice} from '@reduxjs/toolkit'

interface ThemeState {
  darkMode: boolean
}

const defaultDarkMode: boolean = (() => {
  const item = localStorage.getItem('darkMode')
  return item ? JSON.parse(item) : window.matchMedia('(prefers-color-scheme: dark)').matches
})()

const initialState: ThemeState = {
  darkMode: defaultDarkMode,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode))
    },
  },
})

export const {toggleDarkMode} = themeSlice.actions
export default themeSlice.reducer
