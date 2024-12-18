import {useState} from 'react'
import {Outlet} from 'react-router-dom'

// components
import {Layout as AntLayout} from 'antd'
import {Content, Header, Layout, Sider, ToggleButton} from './MainLayout.style'
import {Menu} from '@/components/common'

// icons
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons'

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <Sider trigger={null} collapsed={collapsed} width={250}>
        <ToggleButton
          shape="circle"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
        <Menu collapsed={collapsed} />
      </Sider>
      <AntLayout>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </AntLayout>
    </Layout>
  )
}

export default MainLayout
