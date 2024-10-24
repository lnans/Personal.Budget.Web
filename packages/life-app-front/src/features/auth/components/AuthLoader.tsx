import { ReactNode, useEffect, useRef } from 'react'

import AppLoaderFallback from '@/components/fallbacks/AppLoaderFallback'

import { useRefreshToken } from '../api/refreshTokenEndpoint'
import { useAuthStore } from '../stores/authStore'

type AuthLoaderProps = {
  children: ReactNode
  onRedirect: () => void
}

function AuthLoader({ children, onRedirect }: AuthLoaderProps) {
  const identity = useAuthStore((state) => state.identity)
  const { setIdentity, getAuthState, clearIdentity } = useAuthStore((state) => state.actions)
  const authState = getAuthState()

  const refreshQuery = useRefreshToken({
    mutationConfig: {
      onSuccess: (identity) => setIdentity(identity),
      onError: () => {
        clearIdentity()
        onRedirect()
      },
    },
  })

  const timeout = useRef<number>(0)

  useEffect(() => {
    if (identity && authState === 'Authenticated') {
      // TODO: test if the timeout works correctly
      const accessExpiresIn = (identity.accessToken.expiresIn - 60) * 1000

      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => {
        refreshQuery.mutate({ form: { refreshToken: identity.refreshToken.token } })
      }, accessExpiresIn)

      return
    }

    if (!identity || authState === 'NotAuthenticated') {
      onRedirect()
      return
    }

    if (authState === 'AccessExpired') {
      refreshQuery.mutate({ form: { refreshToken: identity.refreshToken.token } })
    }

    return () => {
      clearTimeout(timeout.current)
    }
  }, [identity, authState, refreshQuery, onRedirect])

  if (authState !== 'Authenticated') {
    return <AppLoaderFallback />
  }

  return children
}

export default AuthLoader
