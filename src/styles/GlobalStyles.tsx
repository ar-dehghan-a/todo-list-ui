import {Global, css} from '@emotion/react'
import 'antd/dist/reset.css'

const GlobalStyles = () => (
  <Global
    styles={css`
      [data-theme='light'],
      :root {
        --ant-layout-body-bg: #f5f5f5;
        --todo-item-body-bg: #ffffff;
      }

      [data-theme='dark'] {
        --ant-layout-body-bg: #121212;
        --todo-item-body-bg: #2d2d2d;
      }

      [data-no-transition] * {
        transition: none !important;
      }

      /* Increase icon margin in input fields */
      .ant-input-affix-wrapper .ant-input-prefix {
        margin-inline-end: 6px;
      }

      @font-face {
        font-family: 'Vazir';
        src: url('../assets/fonts/Vazir-Thin-FD-WOL.woff2') format('woff2'),
          url('../assets/fonts/Vazir-Thin-FD-WOL.woff') format('woff');
        font-weight: 100;
        font-style: normal;
      }

      @font-face {
        font-family: 'Vazir';
        src: url('../assets/fonts/Vazir-Light-FD-WOL.woff2') format('woff2'),
          url('../assets/fonts/Vazir-Light-FD-WOL.woff') format('woff');
        font-weight: 300;
        font-style: normal;
      }

      @font-face {
        font-family: 'Vazir';
        src: url('../assets/fonts/Vazir-FD-WOL.woff2') format('woff2'),
          url('../assets/fonts/Vazir-FD-WOL.woff') format('woff');
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: 'Vazir';
        src: url('../assets/fonts/Vazir-Medium-FD-WOL.woff2') format('woff2'),
          url('../assets/fonts/Vazir-Medium-FD-WOL.woff') format('woff');
        font-weight: 500;
        font-style: normal;
      }

      @font-face {
        font-family: 'Vazir';
        src: url('../assets/fonts/Vazir-Bold-FD-WOL.woff2') format('woff2'),
          url('../assets/fonts/Vazir-Bold-FD-WOL.woff') format('woff');
        font-weight: 700;
        font-style: normal;
      }

      .ant-message-notice-content {
        font-family: 'Vazir', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
      }
    `}
  />
)

export default GlobalStyles
