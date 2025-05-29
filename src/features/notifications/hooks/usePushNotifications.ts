import {useCallback, useState} from 'react'
import {urlBase64ToUint8Array} from '@/utils/binary'
import {useGetPublicKey, useSubscribeToPushNotification} from '../services/mutations'

import type {AxiosError} from 'axios'

const usePushNotifications = () => {
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {mutateAsync: getPublicKey} = useGetPublicKey()
  const {mutateAsync: subscribeToPushNotification} = useSubscribeToPushNotification()

  const subscribe = useCallback(async () => {
    setIsSubscribing(true)
    setError(null)

    try {
      if (!('serviceWorker' in navigator))
        throw new Error('Service workers are not supported in this browser.')

      if (!('PushManager' in window))
        throw new Error('Push messaging is not supported in this browser.')

      const registration = await navigator.serviceWorker.ready

      const existingSubscription = await registration.pushManager.getSubscription()
      if (existingSubscription) {
        setIsSubscribed(true)
        return
      }

      const {publicKey} = await getPublicKey()

      if (!publicKey) throw new Error('No public key received from server')

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      })

      await subscribeToPushNotification(subscription)
      setIsSubscribed(true)
    } catch (err) {
      const axiosError = err as AxiosError<{message?: string}>
      console.error('Failed to subscribe to push notifications:', axiosError)

      let errorMessage = 'Failed to subscribe to push notifications'

      if (axiosError.response?.data?.message) {
        errorMessage = axiosError.response.data.message
      } else if (axiosError.message) {
        errorMessage = axiosError.message
      }

      setError(errorMessage)
      setIsSubscribed(false)
    } finally {
      setIsSubscribing(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    subscribe,
    isSubscribing,
    isSubscribed,
    error,
  }
}

export default usePushNotifications
