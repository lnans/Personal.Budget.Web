import { useAuth0 } from '@auth0/auth0-react'
import { Center, Loader, Stack } from '@mantine/core'
import { ReactNode, useMemo } from 'react'

import { AppLogo } from '@/components/Elements'

type AppLoaderProps = {
  children: ReactNode
}

export function AppLoader({ children }: AppLoaderProps) {
  const { isLoading, isAuthenticated, error, loginWithRedirect } = useAuth0()

  const render = useMemo(
    () => (
      <Center maw={400} h="100vh" mx="auto">
        <Stack align="center">
          <AppLogo />
          <Loader />
        </Stack>
      </Center>
    ),
    []
  )

  if (error || isLoading) {
    return render
  }

  if (!isAuthenticated) {
    loginWithRedirect({ appState: { returnTo: window.location.pathname } })
    return render
  }

  return <>{children}</>
}
