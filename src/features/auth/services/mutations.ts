import {useMutation} from '@tanstack/react-query'
import {forgotPassword, login, register, resetPassword} from './api'
import type {ResetPasswordCredentials} from './api'

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

export const useResetPassword = (token: string) => {
  return useMutation({
    mutationFn: (data: ResetPasswordCredentials) => resetPassword(token, data),
  })
}
