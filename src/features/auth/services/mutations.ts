import {useMutation} from '@tanstack/react-query'
import {forgotPassword, login, register} from './api'

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: register,
  })
}

export const useLoginUser = () => {
  return useMutation({
    mutationFn: login,
  })
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  })
}
