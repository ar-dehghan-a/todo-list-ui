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

      // Step 1: Check if service worker is registered
      const registrations = await navigator.serviceWorker.getRegistrations()
      if (!registrations || registrations.length === 0)
        throw new Error(
          'No service worker is registered. Please refresh the page or try again later.'
        )

      // Step 2: Wait for service worker to be ready
      const registration = await navigator.serviceWorker.ready
      if (!registration) throw new Error('Service worker is not ready. Please try again later.')

      // Step 3: Request permission
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') throw new Error('Permission not granted for notifications')

      // Step 4: Get public key from backend
      const {publicKey} = await getPublicKey()

      // Step 5: Create push subscription
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      })

      // Step 6: Send subscription to backend
      await subscribeToPushNotification(subscription)

      options?.onSuccess?.()
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      console.error('Failed to subscribe to push notifications:', error)
      options?.onError?.(error)
    }
  }

  return {subscribe}
}

export default usePushNotifications
