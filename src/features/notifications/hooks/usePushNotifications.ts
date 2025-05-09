import {urlBase64ToUint8Array} from '@/utils/binary'
import {useCallback, useState} from 'react'

import {getPublicKey, subscribeToPushNotification} from '../services/api'

import type {AxiosError} from 'axios'

const usePushNotifications = () => {
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const subscribe = useCallback(async () => {
    setIsSubscribing(true)
    setError(null)

    try {
      if (!('serviceWorker' in navigator))
        throw new Error('Service workers are not supported in this browser.')

      const registration = await navigator.serviceWorker.ready

      const {publicKey} = await getPublicKey()

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      })

      await subscribeToPushNotification(subscription)
      setIsSubscribed(true)
    } catch (err) {
      const axiosError = err as AxiosError<{message?: string}>
      console.error('Failed to subscribe to push notifications:', axiosError)

      if (axiosError.response?.data?.message) {
        setError(axiosError.response.data.message)
      } else if (axiosError.message) {
        setError(axiosError.message)
      } else {
        setError('Unknown error occurred.')
      }

      setIsSubscribed(false)
    } finally {
      setIsSubscribing(false)
    }
  }, [])

  return {
    subscribe,
    isSubscribing,
    isSubscribed,
    error,
  }
}

export default usePushNotifications
