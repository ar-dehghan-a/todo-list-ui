import {useCallback, useMemo} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import {useAppDispatch, useAppSelector} from '@/store'
import {clearToken, setToken} from '../store/authSlice'
import {useGetCurrentUser} from '../services/queries'

const useAuth = () => {
  const authState = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const isAuthenticated = useMemo(() => !!authState.token, [authState.token])
  const token = useMemo(() => authState.token, [authState.token])

  const {data: currentUser, isLoading, isFetching} = useGetCurrentUser(isAuthenticated)

  const handleSetToken = useCallback((token: string) => dispatch(setToken(token)), [dispatch])
  const handleLogout = useCallback(() => {
    dispatch(clearToken())
    queryClient.clear()
  }, [dispatch, queryClient])

  return {
    token,
    isAuthenticated,
    currentUser: currentUser?.data || null,
    isLoading: isLoading || isFetching,
    setToken: handleSetToken,
    logout: handleLogout,
  }
}

export default useAuth
