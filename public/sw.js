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
    let data

    try {
      data = event.data.json()
    } catch (e) {
      data = {
        title: 'Notification',
        body: event.data.text(),
      }
    }

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
    const urlToOpen = event.notification.data.url || '/todos'

    event.waitUntil(
      clients.matchAll({type: 'window'}).then(function (clientList) {
        // Check if there's already a window open
        for (const client of clientList) {
          if ('focus' in client && 'navigate' in client) {
            client.focus()
            return client.navigate(urlToOpen)
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
