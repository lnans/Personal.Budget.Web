import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { I18nextProvider } from 'react-i18next'

import { MainErrorFallback } from '@/components/errors/MainErrorFallback'
import { AppLoader } from '@/components/feedback/AppLoader'
import { i18next } from '@/lib/react-i18next'
import { queryClient } from '@/lib/tanstack-query'

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <AppLoader />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <I18nextProvider i18n={i18next}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />

            {children}
          </QueryClientProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </React.Suspense>
  )
}
