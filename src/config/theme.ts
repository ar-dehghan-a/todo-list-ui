import {theme} from 'antd'
import type {ThemeConfig} from 'antd'

export const lightThemeConfig: ThemeConfig = {
  token: {
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
