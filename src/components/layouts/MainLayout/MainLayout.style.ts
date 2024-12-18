import styled from '@emotion/styled'
import {Button, Layout as AntLayout} from 'antd'

export const Layout = styled(AntLayout)`
  padding: 8px;
  width: 100%;
  height: 100vh;
`

export const Sider = styled(AntLayout.Sider)`
  background-color: #fff;
  border-radius: 8px;
`

export const Header = styled(AntLayout.Header)`
  background-color: transparent;
  border-radius: 8px;
`

export const Content = styled(AntLayout.Content)`
  margin: 32px 60px 24px;
  padding: 24px;
  min-height: 280px;
`

export const ToggleButton = styled(Button)`
  position: absolute;
  right: -12px;
  top: 14px;
  z-index: 10;
`
