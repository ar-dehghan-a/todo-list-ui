import {useState} from 'react'
import {Outlet} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {useLanguage, useTheme} from '@/hooks'

// components
import {Layout as AntLayout, Button} from 'antd'
import {Content, Header, Layout, Sider, ToggleButton} from './MainLayout.style'
import {SidebarMenu} from '@/components/common'

// icons
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons'
import {MoonFilled, SunFilled} from './MainLayout.style'
import {LanguageOutlined} from '@/assets/icons'

const MainLayout = () => {
  const {t} = useTranslation()
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
        <SidebarMenu collapsed={collapsed} />
      </Sider>
      <AntLayout>
        <Header>
          <Button color="default" variant="link" onClick={toggleLanguage} icon={<LanguageOutlined />}>
            {language === 'en' ? t('languages.persian') : t('languages.english')}
          </Button>

          <Button
            color="default"
            variant="link"
            onClick={toggleThemeMode}
            icon={isDarkMode ? <SunFilled /> : <MoonFilled />}
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
