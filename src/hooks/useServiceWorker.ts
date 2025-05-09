import {useAuth} from '@/features/auth'
import {usePushNotifications} from '@/features/notifications'
import {useEffect} from 'react'

const useServiceWorker = () => {
  const {isAuthenticated} = useAuth()
  const {subscribe} = usePushNotifications()

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then(() => {
            if (isAuthenticated) {
              const permission = Notification.permission

              if (permission === 'default')
                Notification.requestPermission()
                  .then(result => {
                    if (result === 'granted') subscribe()
                  })
                  .catch(error => {
                    console.error('Error requesting notification permission:', error)
                  })
            }
          })
          .catch(error => {
            console.error('Service Worker registration failed:', error)
          })
      })
    }
  }, [isAuthenticated, subscribe])
}

export default useServiceWorker
