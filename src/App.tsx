import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'

import { ErrorFallback } from '@/components/Fallbacks'
import { queryClient } from '@/lib/react-query'
import { AuthProvider } from '@/providers'
import { Router } from '@/routes'

function App() {
  const { t } = useTranslation('common')
  return (
    // Errorboundary is a class component, we can't use useTranslation hook inside it
    <ErrorBoundary FallbackComponent={(props) => <ErrorFallback t={t} {...props} />}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
