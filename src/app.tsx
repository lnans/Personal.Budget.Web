import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { Notifications } from '@mantine/notifications'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from 'api/client'
import { AppLoader } from 'components'
import { AuthProvider } from 'contexts'
import { useCallback } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Router } from 'router'
import { themeOverride } from 'styles'

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
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  )
}

export default App
