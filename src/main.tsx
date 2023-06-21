import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/lib/react-i18next'
import App from './App.tsx'
import { initMocks } from './test/server'

initMocks()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
