// import {useEffect} from 'react'
// import {useAppDispatch} from '@app/hooks/reduxHooks'
import {Navigate} from 'react-router-dom'
// import {doLogout} from '@app/store/slices/authSlice'

const Logout = () => {
  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(doLogout())
  // }, [dispatch])

  return <Navigate to="/login" replace />
}

export default Logout
