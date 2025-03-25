import {useState} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import {useLanguage} from '@/hooks'
import {useAuth} from '@/features/auth'

// components
import {Layout as AntLayout, Dropdown, MenuProps} from 'antd'
import {TodoDrawer} from '@/features/todos'
import SidebarMenu from '../../components/SidebarMenu'
import SwitchLanguage from '../../components/SwitchLanguage'
import SwitchThemeMode from '../../components/SwitchThemeMode'
import {Content, Header, Layout, Sider, ToggleButton, UserInfo} from './MainLayout.style'

// icons
import {LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from '@ant-design/icons'

const items: MenuProps['items'] = [
  {
    key: 'profile',
    label: 'Profile',
    icon: <UserOutlined />,
  },
  // {
  //   key: '2',
  //   label: 'Settings',
  //   icon: <SettingOutlined />,
  // },
  {
    key: 'logout',
    label: 'Logout',
    icon: <LogoutOutlined />,
  },
]

const MainLayout = () => {
  const navigate = useNavigate()
  const {isRTL} = useLanguage()
  const {currentUser} = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const handleCollapse = () => setCollapsed(!collapsed)

  const onClick: MenuProps['onClick'] = ({key}) => navigate(key)

  return (
    <Layout>
      <Sider trigger={null} collapsed={collapsed} width={260}>
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
          onClick={handleCollapse}
        />

        <SidebarMenu collapsed={collapsed} />

        <Dropdown menu={{items, onClick}} trigger={['click']} destroyPopupOnHide>
          <UserInfo collapsed={collapsed}>
            <div className="user-info-avatar">
              <img src={currentUser?.photo} alt={currentUser?.name} />
            </div>

            <div className="user-info">
              <span className="user-info-name">
                {currentUser?.name} {currentUser?.surname}
              </span>
              <span className="user-info-email">{currentUser?.email}</span>
            </div>
          </UserInfo>
        </Dropdown>
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
