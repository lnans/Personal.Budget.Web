import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { Notifications } from '@mantine/notifications'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useCallback } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'

import { AppLoader } from '@/components/Elements'
import { queryClient } from '@/lib/react-query'
import { AuthProvider } from '@/providers'
import { Router } from '@/routes'
import { themeOverride } from '@/theme'

const ErrorFallback = () => {
  return (
    <div>
      <h2>Ooops, something went wrong :( </h2>
      <button onClick={() => window.location.assign(window.location.origin)}>Refresh</button>
    </div>
  )
}

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = useCallback(
    (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark')),
    [colorScheme, setColorScheme]
  )

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider withGlobalStyles withNormalizeCSS theme={themeOverride(colorScheme)}>
            <Notifications position="bottom-center" />
            <BrowserRouter>
              <AuthProvider>
                <AppLoader>
                  <Router />
                </AppLoader>
              </AuthProvider>
            </BrowserRouter>
          </MantineProvider>
        </ColorSchemeProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
