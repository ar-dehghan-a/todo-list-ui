import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider as ReduxProvider} from 'react-redux'

import App from './App.tsx'
import './config/i18n.ts'
import {store} from './store/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </StrictMode>
)
