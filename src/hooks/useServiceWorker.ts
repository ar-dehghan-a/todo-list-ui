import {usePushNotifications} from '@/features/notifications'
import {useEffect} from 'react'

interface UseServiceWorkerOptions {
  onUpdate?: (registration: ServiceWorkerRegistration) => void
  onSuccess?: (registration: ServiceWorkerRegistration) => void
}

const useServiceWorker = (options?: UseServiceWorkerOptions) => {
  const {subscribeWithoutPushRequest} = usePushNotifications()

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    let idleCallbackId: number | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          type: 'classic',
        })

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (!newWorker) return

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.info('New update available!')
              subscribeWithoutPushRequest()
              options?.onUpdate?.(registration)
            }
          })
        })

        options?.onSuccess?.(registration)
        console.info('SW registered')
      } catch (error) {
        console.error('SW registration failed:', error)
      }
    }

    const onLoad = () => {
      if ('requestIdleCallback' in window) {
        idleCallbackId = (
          window as {requestIdleCallback: (cb: () => void) => number}
        ).requestIdleCallback(registerSW)
      } else {
        timeoutId = setTimeout(registerSW, 200)
      }
    }

    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      if (idleCallbackId !== null && 'cancelIdleCallback' in window) {
        ;(window as {cancelIdleCallback: (id: number) => void}).cancelIdleCallback(idleCallbackId)
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])
}

export default useServiceWorker
