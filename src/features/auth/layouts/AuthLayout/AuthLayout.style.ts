import styled from '@emotion/styled'
import {Layout as AntLayout} from 'antd'

export const Layout = styled(AntLayout)`
  width: 100vw;
  min-height: 100dvh;
  padding: 8px;
`

export const Content = styled(AntLayout.Content)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

export const Footer = styled(AntLayout.Footer)`
  display: flex;
  align-items: center;
  justify-content: center;
  direction: ltr;
  margin-top: 32px;
  border-radius: 8px;
  gap: 8px;
`
