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
        onRedirect()
        clearIdentity()
      },
    },
  })

  const timeout = useRef<number>(0)

  useEffect(() => {
    if (refreshQuery.isPending || refreshQuery.isError) {
      return
    }

    if (identity && authState === 'Authenticated') {
      const accessExpiresAt = identity.accessToken.expiresAt
      const now = new Date().getTime()
      const accessExpiresIn = accessExpiresAt - now - 60000 // 1 minute before expiration

      console.info(`%cAuthenticated, next refresh in: ${(accessExpiresIn / 1000).toFixed(0)}sec`, 'color: LightSkyBlue;')

      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => {
        console.info('%cRefreshing auth token...', 'color: LightSkyBlue;')
        refreshQuery.mutate({ form: { refreshToken: identity.refreshToken.token } })
      }, accessExpiresIn)

      return
    }

    if (!identity || authState === 'NotAuthenticated') {
      onRedirect()
      return
    }

    if (authState === 'AccessExpired') {
      console.info('%cRefreshing auth token...', 'color: LightSkyBlue;')
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
