import styled from '@emotion/styled'
import {css} from '@emotion/react'
import {Button, Layout as AntLayout} from 'antd'

export const Layout = styled(AntLayout)`
  width: 100%;
  height: 100vh;
  padding: 8px 4px 8px 8px;
  gap: 16px;
`

export const Sider = styled(AntLayout.Sider)`
  border-radius: 8px;
`

export const Header = styled(AntLayout.Header)`
  display: flex;
  align-items: center;
  justify-content: end;
  background-color: transparent;
  gap: 8px;
`

export const Content = styled(AntLayout.Content)`
  padding-bottom: 16px;
  height: 100%;
`

export const ToggleButton = styled(Button)`
  position: absolute;
  top: 14px;
  z-index: 10;
  ${({theme}) => css`
    ${theme.dir === 'rtl' ? 'left: -12px;' : 'right: -12px;'}
  `}
`
