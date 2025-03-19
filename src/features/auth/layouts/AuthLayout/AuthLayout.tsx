import {SwitchLanguage, SwitchThemeMode} from '@/features/app'
import {Navigate, Outlet} from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import {Content, Footer, Layout} from './AuthLayout.style'

const AuthLayout = () => {
  const {isAuthenticated} = useAuth()

  if (isAuthenticated) return <Navigate to="/todos" replace />

  return (
    <Layout>
      <Content>
        <Outlet />
      </Content>

      <Footer>
        <SwitchLanguage />
        <SwitchThemeMode />
      </Footer>
    </Layout>
  )
}

export default AuthLayout
