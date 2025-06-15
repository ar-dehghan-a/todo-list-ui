import {useEffect, useRef, useCallback} from 'react'
import {useAuth} from '@/features/auth'
import {usePushNotifications} from '@/features/notifications'

const useServiceWorker = () => {
  const {isAuthenticated} = useAuth()
  const {subscribe} = usePushNotifications()
  const hasInitialized = useRef(false)

  const handleNotificationSubscription = useCallback(async () => {
    // Check if browser supports notifications
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications')
      return
    }

    const permission = Notification.permission
    console.info('Current notification permission:', permission)

    if (permission === 'granted') {
      // Already granted, subscribe immediately
      await subscribe()
    } else if (permission === 'default') {
      // Request permission first
      try {
        const result = await Notification.requestPermission()
        console.info('Permission request result:', result)
        if (result === 'granted') {
          await subscribe()
        } else {
          console.warn('Notification permission was not granted:', result)
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error)
      }
    } else if (permission === 'denied') {
      console.warn(
        'Notification permission was previously denied. User needs to manually enable it in browser settings.'
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkAndHandleSubscription = useCallback(async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()

      if (!subscription) {
        // No subscription exists, try to subscribe
        await handleNotificationSubscription()
        return
      }

      // Check if subscription is still valid
      const isValid = await subscription.unsubscribe()
      if (!isValid) {
        // Subscription is invalid, try to re-subscribe
        await handleNotificationSubscription()
      }
    } catch (error) {
      console.error('Error checking subscription:', error)
      // If there's an error, try to re-subscribe
      await handleNotificationSubscription()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initializeServiceWorker = useCallback(async () => {
    if (!('serviceWorker' in navigator) || hasInitialized.current) return

    try {
      await navigator.serviceWorker.register('/sw.js')
      await navigator.serviceWorker.ready

      hasInitialized.current = true

      if (isAuthenticated) {
        await checkAndHandleSubscription()
      }
    } catch (error) {
      console.error('Service Worker registration failed:', error)
    }
  }, [isAuthenticated, checkAndHandleSubscription])

  useEffect(() => {
    initializeServiceWorker()
  }, [initializeServiceWorker])
}

export default useServiceWorker
