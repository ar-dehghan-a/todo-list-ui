import styled from '@emotion/styled'
import {css} from '@emotion/react'
import {Button, Layout as AntLayout} from 'antd'

export const Layout = styled(AntLayout)`
  width: 100%;
  height: 100vh;
  padding: 0.5rem;
  gap: 1rem;
`

export const Sider = styled(AntLayout.Sider)`
  border-radius: 0.5rem;
`

export const Header = styled(AntLayout.Header)`
  display: flex;
  align-items: center;
  justify-content: end;
  background-color: transparent;
  gap: 0.5rem;
  border-radius: 0.5rem;
`

export const Content = styled(AntLayout.Content)`
  padding: 1.5rem;
  min-height: 17.5rem;
`

export const ToggleButton = styled(Button)`
  position: absolute;
  top: 0.875rem;
  z-index: 10;
  ${({theme}) => css`
    ${theme.dir === 'rtl' ? 'left: -0.75rem;' : 'right: -0.75rem;'}
  `}
`
