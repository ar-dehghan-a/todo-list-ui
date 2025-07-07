import {useEffect} from 'react'

interface UseServiceWorkerOptions {
  onUpdate?: (registration: ServiceWorkerRegistration) => void
  onSuccess?: (registration: ServiceWorkerRegistration) => void
}

const isProd = true // import.meta.env.NODE_ENV === 'production'

const useServiceWorker = (options?: UseServiceWorkerOptions) => {
  useEffect(() => {
    if (!isProd || !('serviceWorker' in navigator)) return

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
  }, [options])
}

export default useServiceWorker
