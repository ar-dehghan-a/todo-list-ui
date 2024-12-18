import {Outlet} from 'react-router-dom'

import {Container, Content} from './AuthLayout.style'

const AuthLayout = () => {
  return (
    <Content>
      <Container>
        <Outlet />
      </Container>
    </Content>
  )
}

export default AuthLayout
