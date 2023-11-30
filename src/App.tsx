import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ErrorBoundary } from 'react-error-boundary'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'

import { ErrorFallback } from '@/components/Fallbacks'
import { i18next } from '@/lib/react-i18next'
import { queryClient } from '@/lib/react-query'
import { AuthProvider } from '@/providers'
import { Router } from '@/routes'

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <I18nextProvider i18n={i18next}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
        </QueryClientProvider>
      </I18nextProvider>
    </ErrorBoundary>
  )
}

export default App
