import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { I18nextProvider } from 'react-i18next'

import { AppErrorFallback } from '@/components/fallbacks/AppErrorFallback'
import AppLoaderFallback from '@/components/fallbacks/AppLoaderFallback'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { i18next } from '@/lib/react-i18next'
import { queryClient } from '@/lib/tanstack-query'

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense fallback={<AppLoaderFallback />}>
      <ErrorBoundary FallbackComponent={AppErrorFallback}>
        <ThemeProvider defaultTheme="dark">
          <I18nextProvider i18n={i18next}>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools />

              {children}
            </QueryClientProvider>
          </I18nextProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </Suspense>
  )
}
