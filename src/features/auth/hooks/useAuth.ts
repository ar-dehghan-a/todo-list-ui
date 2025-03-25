import {useCallback, useMemo} from 'react'
import {useAppDispatch, useAppSelector} from '@/store'
import {clearToken, setToken} from '../store/authSlice'
import {useGetCurrentUser} from '../services/queries'

const useAuth = () => {
  const authState = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const isAuthenticated = useMemo(() => !!authState.token, [authState.token])
  const token = useMemo(() => authState.token, [authState.token])

  const {data: currentUser, isLoading} = useGetCurrentUser(isAuthenticated)

  const handleSetToken = useCallback((token: string) => dispatch(setToken(token)), [dispatch])
  const handleLogout = useCallback(() => dispatch(clearToken()), [dispatch])

  return {
    isAuthenticated,
    token,
    currentUser: currentUser?.data,
    isLoading,
    setToken: handleSetToken,
    logout: handleLogout,
  }
}

export default useAuth
