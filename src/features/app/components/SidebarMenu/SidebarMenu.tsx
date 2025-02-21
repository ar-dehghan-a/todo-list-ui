import {useLocation, useNavigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

// components
import {Menu} from './SidebarMenu.style'

// icons
import {HomeOutlined, StarOutlined} from '@ant-design/icons'

// types
interface MenuProps {
  collapsed: boolean
}

const SidebarMenu = ({collapsed}: MenuProps) => {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const activeItem = location.pathname.substring(1)

  return (
    <Menu
      mode="inline"
      inlineCollapsed={collapsed}
      selectedKeys={[activeItem]}
      onSelect={e => navigate(`/${e.key}`)}
      items={[
        {
          key: 'important',
          icon: <StarOutlined />,
          label: t('sidebar.important'),
        },
        {
          key: 'todos',
          icon: <HomeOutlined />,
          label: t('sidebar.todos'),
        },
      ]}
    />
  )
}

export default SidebarMenu
