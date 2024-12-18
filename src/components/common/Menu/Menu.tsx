import {Flex, Menu as AntMenu} from 'antd'

import {HomeOutlined, StarOutlined, SunOutlined} from '@ant-design/icons'
import {Header, Title} from './Menu.style'

interface MenuProps {
  collapsed: boolean
}

const Menu = ({collapsed}: MenuProps) => {
  return (
    <Flex vertical>
      <Header collapsed={collapsed}>
        <Title level={4}>Todo List</Title>
      </Header>
      <AntMenu
        mode="inline"
        defaultSelectedKeys={['todos']}
        onSelect={e => console.log(e)}
        items={[
          {
            key: 'myday',
            icon: <SunOutlined />,
            label: 'My Day',
          },
          {
            key: 'important',
            icon: <StarOutlined />,
            label: 'Important',
          },
          {
            key: 'todos',
            icon: <HomeOutlined />,
            label: 'Todos',
          },
        ]}
      />
    </Flex>
  )
}

export default Menu
