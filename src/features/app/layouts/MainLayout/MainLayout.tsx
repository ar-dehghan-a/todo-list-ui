import {useAuth} from '@/features/auth'
import {useLanguage} from '@/hooks'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {Outlet, useNavigate} from 'react-router-dom'

// Components
import {TodoDrawer} from '@/features/todos'
import {Layout as AntLayout, Avatar, Dropdown} from 'antd'
import SidebarMenu from '../../components/SidebarMenu'
import SwitchLanguage from '../../components/SwitchLanguage'
import SwitchThemeMode from '../../components/SwitchThemeMode'
import {Content, Header, Layout, Sider, ToggleButton, UserInfo} from './MainLayout.style'

// Icons
import {LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from '@ant-design/icons'

// Types
import type {MenuProps} from 'antd'

const MainLayout = () => {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const {isRTL} = useLanguage()
  const {currentUser} = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const handleCollapse = () => setCollapsed(!collapsed)

  const onClick: MenuProps['onClick'] = ({key}) => navigate(key)

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: t('sidebar.profile'),
      icon: <UserOutlined />,
    },
    // {
    //   key: '2',
    //   label: 'Settings',
    //   icon: <SettingOutlined />,
    // },
    {
      key: 'logout',
      label: t('sidebar.logout'),
      icon: <LogoutOutlined />,
    },
  ]

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
            <Avatar
              src={currentUser?.photo}
              size={52}
              icon={<UserOutlined />}
              className="user-info-avatar"
            />

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
