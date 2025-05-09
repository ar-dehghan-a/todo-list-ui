import {QueryClientProvider} from '@tanstack/react-query'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider as ReduxProvider} from 'react-redux'
import queryClient from './config/react-query'

import App from './App.tsx'
import './config/i18n.ts'
import {store} from './store/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </QueryClientProvider>
  </StrictMode>
)
