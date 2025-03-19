import {theme} from 'antd'
import type {ThemeConfig} from 'antd'

export const lightThemeConfig: ThemeConfig = {
  token: {
    fontFamily:
      "'Vazir', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
    colorPrimary: '#FFAE03',
    colorTextSecondary: '#FF5733',
  },
  components: {
    Layout: {
      siderBg: '#fff',
    },
  },
  algorithm: theme.defaultAlgorithm,
}

export const darkThemeConfig: ThemeConfig = {
  token: {
    fontFamily:
      "'Vazir', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
    colorPrimary: '#FFAE03',
    colorTextSecondary: '#FF5733',
  },
  components: {
    Layout: {
      bodyBg: '#121212',
    },
  },
  algorithm: theme.darkAlgorithm,
}
