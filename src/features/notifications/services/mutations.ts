import {useMutation} from '@tanstack/react-query'
import {getPublicKey, subscribeToPushNotification} from './api'

export const useGetPublicKey = () => {
  return useMutation({
    mutationFn: getPublicKey,
  })
}

export const useSubscribeToPushNotification = () => {
  return useMutation({
    mutationFn: subscribeToPushNotification,
  })
}
