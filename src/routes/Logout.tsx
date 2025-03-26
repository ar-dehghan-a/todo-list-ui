import {useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {useAuth} from '@/features/auth'

const Logout = () => {
  const {logout} = useAuth()

  useEffect(() => {
    logout()
  }, [logout])

  return <Navigate to="/auth/login" replace />
}

export default Logout
