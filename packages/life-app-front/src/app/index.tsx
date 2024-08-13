import { useMemo } from 'react'
import { RouterProvider } from 'react-router-dom'

import AppLoaderFallback from '@/components/fallbacks/AppLoaderFallback'

import { AppProvider } from './main-provider'
import { createRouter } from './routes'

const AppRouter = () => {
  const router = useMemo(() => createRouter(), [])

  return <RouterProvider fallbackElement={<AppLoaderFallback />} router={router} />
}

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}

export default App
