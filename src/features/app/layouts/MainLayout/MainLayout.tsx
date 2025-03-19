import {useState} from 'react'
import {Outlet} from 'react-router-dom'
import {useLanguage} from '@/hooks'

// components
import {Layout as AntLayout} from 'antd'
import {TodoDrawer} from '@/features/todos'
import SidebarMenu from '../../components/SidebarMenu'
import {Content, Header, Layout, Sider, ToggleButton} from './MainLayout.style'

// icons
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons'
import SwitchLanguage from '../../components/SwitchLanguage'
import SwitchThemeMode from '../../components/SwitchThemeMode'

const MainLayout = () => {
  const {isRTL} = useLanguage()
  const [collapsed, setCollapsed] = useState(false)

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
          <SwitchLanguage />
          <SwitchThemeMode />
        </Header>
        <Content>
          <Outlet />
          <TodoDrawer />
        </Content>
      </AntLayout>
    </Layout>
  )
}

export default MainLayout
