self.addEventListener('install', event => {
  console.info('Service Worker installing...')
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  console.info('Service Worker activating...')
  event.waitUntil(self.clients.claim())
})

self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json()

    const options = {
      body: data.body,
      icon: '/favicon-96x96.png',
      badge: '/apple-touch-icon.png',
      data: data.data || {},
      actions: [
        {
          action: 'view',
          title: 'View Task',
        },
      ],
    }

    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close()

  if (event.action === 'view') {
    // Default action is to open the app
    const urlToOpen = event.notification.data.url || '/'

    event.waitUntil(
      clients.matchAll({type: 'window'}).then(function (clientList) {
        // Check if there's already a window open
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus()
          }
        }
        // If no window is open, open a new one
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen)
        }
      })
    )
  }
})
