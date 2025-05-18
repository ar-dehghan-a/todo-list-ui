import {keyframes} from '@emotion/react'
import styled from '@emotion/styled'
import {Button} from 'antd'
import useTheme from '../hooks/useTheme'

// Icons
import {MoonFilled as MoonFilledIcon, SunFilled as SunFilledIcon} from '@ant-design/icons'

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
  font-size: 24px !important;
  color: #f6d447;
  animation: ${animatedFade} 0.5s ease-in-out;

  @media (max-width: 768px) {
    font-size: 20px !important;
  }
`

export const MoonFilled = styled(MoonFilledIcon)`
  font-size: 24px !important;
  color: #001529;
  animation: ${animatedFade} 0.5s ease-in-out;

  @media (max-width: 768px) {
    font-size: 20px !important;
  }
`

const SwitchThemeMode = () => {
  const {isDarkMode, toggleThemeMode} = useTheme()

  return (
    <Button variant="link" color="default" onClick={toggleThemeMode} size="small">
      {isDarkMode ? <SunFilled /> : <MoonFilled />}
    </Button>
  )
}

export default SwitchThemeMode
