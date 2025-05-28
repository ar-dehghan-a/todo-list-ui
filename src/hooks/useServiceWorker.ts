import {useEffect, useRef} from 'react'
import {useAuth} from '@/features/auth'
import {usePushNotifications} from '@/features/notifications'

const useServiceWorker = () => {
  const {isAuthenticated} = useAuth()
  const {subscribe} = usePushNotifications()
  const hasInitialized = useRef(false)

  useEffect(() => {
    const handleNotificationSubscription = async () => {
      const permission = Notification.permission
      console.info({permission})

      if (permission === 'granted') {
        // Already granted, subscribe immediately
        await subscribe()
      } else if (permission === 'default') {
        // Request permission first
        try {
          const result = await Notification.requestPermission()
          if (result === 'granted') {
            await subscribe()
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error)
        }
      }
    }

    const initializeServiceWorker = async () => {
      if (!('serviceWorker' in navigator) || hasInitialized.current) {
        return
      }

      try {
        await navigator.serviceWorker.register('/sw.js')
        await navigator.serviceWorker.ready

        hasInitialized.current = true

        if (isAuthenticated) {
          await handleNotificationSubscription()
        }
      } catch (error) {
        console.error('Service Worker registration failed:', error)
      }
    }

    initializeServiceWorker()
  }, [isAuthenticated, subscribe])
}

export default useServiceWorker
