import {useState} from 'react'
import {Outlet} from 'react-router-dom'
import styled from '@emotion/styled'
import {keyframes} from '@emotion/react'
import useTheme from '@/hooks/useTheme'
import {useLanguage} from '@/hooks/useLanguage'

// components
import {Layout as AntLayout, Button} from 'antd'
import {Content, Header, Layout, Sider, ToggleButton} from './MainLayout.style'
import {Menu} from '@/components/common'

// icons
import {MenuFoldOutlined, MenuUnfoldOutlined, MoonFilled, SunFilled} from '@ant-design/icons'
import {LanguageOutlined} from '@/assets/icons'

// styles
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

const SunFilledIcon = styled(SunFilled)`
  font-size: 1.5rem !important;
  color: #f6d447;
  animation: ${animatedFade} 0.5s ease-in-out;
`

const MoonFilledIcon = styled(MoonFilled)`
  font-size: 1.5rem !important;
  color: #001529;
  animation: ${animatedFade} 0.5s ease-in-out;
`

const MainLayout = () => {
  const {isDarkMode, toggleThemeMode} = useTheme()
  const {language, setLanguage, isRTL} = useLanguage()
  const [collapsed, setCollapsed] = useState(false)

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'fa' : 'en'
    setLanguage(newLanguage)
  }

  return (
    <Layout>
      <Sider trigger={null} collapsed={collapsed} width={250}>
        <ToggleButton
          shape="circle"
          icon={
            collapsed ? (
              isRTL ? (
                <MenuFoldOutlined />
              ) : (
                <MenuUnfoldOutlined />
              )
            ) : isRTL ? (
              <MenuUnfoldOutlined />
            ) : (
              <MenuFoldOutlined />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
        />
        <Menu collapsed={collapsed} />
      </Sider>
      <AntLayout>
        <Header>
          <Button color="default" variant="link" onClick={toggleLanguage} icon={<LanguageOutlined />}>
            {language === 'en' ? 'Persian' : 'انگلیسی'}
          </Button>

          <Button
            color="default"
            variant="link"
            onClick={toggleThemeMode}
            icon={isDarkMode ? <SunFilledIcon /> : <MoonFilledIcon />}
          />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </AntLayout>
    </Layout>
  )
}

export default MainLayout
