import {Global, css} from '@emotion/react'
import 'antd/dist/reset.css'

const GlobalStyles = () => (
  <Global
    styles={css`
      [data-theme='light'],
      :root {
        --todo-item-body-bg: #ffffff;
      }

      [data-theme='dark'] {
        --todo-item-body-bg: #2d2d2d;
      }

      [data-no-transition] * {
        transition: none !important;
      }
    `}
  />
)

export default GlobalStyles
