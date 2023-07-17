import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/lib/react-i18next'
import App from './App.tsx'
import { API_MOCKING } from './config/index.ts'

if (API_MOCKING) {
  import('./test/server').then(({ initMocks }) => initMocks())
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
