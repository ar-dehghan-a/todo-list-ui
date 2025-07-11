import {urlBase64ToUint8Array} from '@/utils/binary'
import {useGetPublicKey, useSubscribeToPushNotification} from '../services/mutations'

// Types
interface UsePushSubscriptionOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

const usePushNotifications = (options?: UsePushSubscriptionOptions) => {
  const {mutateAsync: getPublicKey} = useGetPublicKey()
  const {mutateAsync: subscribeToPushNotification} = useSubscribeToPushNotification()

  const subscribe = async () => {
    try {
      if (!('serviceWorker' in navigator))
        throw new Error('Service workers are not supported in this browser.')

      if (!('PushManager' in window))
        throw new Error('Push messaging is not supported in this browser.')

      // Step 1: Wait for service worker to be ready
      const registration = await navigator.serviceWorker.ready
      if (!registration) throw new Error('Service worker is not ready. Please try again later.')

      // Step 2: Request permission
      const permission = await Notification.requestPermission()
      if (permission !== 'granted')
        throw new Error(`Permission not granted for notifications: ${permission}`)

      // Step 3: Get public key from backend
      const {publicKey} = await getPublicKey()

      // Step 4: Create push subscription
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      })

      // Step 5: Send subscription to backend
      await subscribeToPushNotification(subscription)

      options?.onSuccess?.()
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      console.error(error)
      options?.onError?.(error)
    }
  }

  const subscribeWithoutPushRequest = async () => {
    try {
      if (!('serviceWorker' in navigator))
        throw new Error('Service workers are not supported in this browser.')

      // Step 1: Wait for service worker to be ready
      const registration = await navigator.serviceWorker.getRegistration()
      if (!registration) throw new Error('Service worker is not ready. Please try again later.')

      // Step 2: Get public key from backend
      const {publicKey} = await getPublicKey()

      // Step 3: Create push subscription
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      })

      // Step 4: Send subscription to backend
      await subscribeToPushNotification(subscription)

      options?.onSuccess?.()
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      console.error(error)
      options?.onError?.(error)
    }
  }

  return {subscribe, subscribeWithoutPushRequest}
}

export default usePushNotifications
