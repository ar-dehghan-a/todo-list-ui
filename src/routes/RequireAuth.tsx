import React from 'react'
import {Navigate} from 'react-router-dom'
import {useAuth} from '@/features/auth'

const RequireAuth = ({children}: {children: React.ReactNode}) => {
  const {isAuthenticated} = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth/login" replace />
}

export default RequireAuth
