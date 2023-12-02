import { AppState, Auth0Provider } from '@auth0/auth0-react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ErrorFallback } from '@/components/Fallbacks'
import { auth0Config } from '@/lib/auth0'
import { queryClient } from '@/lib/react-query'
import { CheckAuthProvider } from '@/providers'
import { Router } from '@/routes'

function App() {
  const { t } = useTranslation('common')
  const navigate = useNavigate()

  const onRedirectCallback = (appState?: AppState | undefined) => {
    navigate(appState && appState.returnTo ? appState.returnTo : window.location.pathname)
  }

  return (
    // Errorboundary is a class component, we can't use useTranslation hook inside it
    <ErrorBoundary FallbackComponent={(props) => <ErrorFallback t={t} {...props} />}>
      <QueryClientProvider client={queryClient}>
        <Auth0Provider {...auth0Config} onRedirectCallback={onRedirectCallback}>
          <CheckAuthProvider>
            <Router />
          </CheckAuthProvider>
        </Auth0Provider>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
