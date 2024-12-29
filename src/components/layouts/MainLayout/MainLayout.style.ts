import styled from '@emotion/styled'
import {css, keyframes} from '@emotion/react'
import {Button, Layout as AntLayout} from 'antd'
import {MoonFilled as MoonFilledIcon, SunFilled as SunFilledIcon} from '@ant-design/icons'

export const Layout = styled(AntLayout)`
  width: 100%;
  height: 100vh;
  padding: 8px;
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
  border-radius: 8px;
`

export const Content = styled(AntLayout.Content)`
  padding: 12px 50px;
  min-height: 280px;
`

export const ToggleButton = styled(Button)`
  position: absolute;
  top: 14px;
  z-index: 10;
  ${({theme}) => css`
    ${theme.dir === 'rtl' ? 'left: -12px;' : 'right: -12px;'}
  `}
`

const animatedFade = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(0deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(360deg);
  }
`

export const SunFilled = styled(SunFilledIcon)`
  font-size: 1.5rem !important;
  color: #f6d447;
  animation: ${animatedFade} 0.5s ease-in-out;
`

export const MoonFilled = styled(MoonFilledIcon)`
  font-size: 1.5rem !important;
  color: #001529;
  animation: ${animatedFade} 0.5s ease-in-out;
`
