import {useMutation} from '@tanstack/react-query'
import {login, register} from './api'

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
