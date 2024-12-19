import type {ThemeConfig} from 'antd'
import {theme} from 'antd'

export const lightThemeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#FFAE03',
    colorTextSecondary: '#FF5733',
  },
  components: {
    Layout: {
      headerBg: '#fff',
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
      headerBg: '#001529',
    },
  },
  algorithm: theme.darkAlgorithm,
}
