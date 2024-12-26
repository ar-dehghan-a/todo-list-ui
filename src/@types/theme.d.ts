import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    dir: 'ltr' | 'rtl'
  }
}
