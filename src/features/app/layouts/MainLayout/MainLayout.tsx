import {useAuth} from '@/features/auth'
import {useLanguage, useResponsive} from '@/hooks'
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
  const {isDesktop, isTablet, isMobile} = useResponsive()
  const [collapsed, setCollapsed] = useState(!isDesktop)

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
      {isTablet && <div style={{width: '60px'}} />}

      <Sider
        trigger={null}
        collapsed={collapsed}
        width={250}
        collapsedWidth={isMobile ? 0 : undefined}
        className={!isDesktop ? 'sidebar-sider-mobile' : undefined}
      >
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
          className={isMobile && collapsed ? 'sidebar-toggle-mobile' : undefined}
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
