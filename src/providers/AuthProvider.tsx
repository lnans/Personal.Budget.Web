import { AppState, Auth0Provider, Auth0ProviderOptions, useAuth0 } from '@auth0/auth0-react'
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AUTH_AUDIENCE, AUTH_CLIENT_ID, AUTH_DOMAIN } from '@/config'
import { storage } from '@/utils'

const Auth0 = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  const auth0Config: Auth0ProviderOptions = {
    domain: AUTH_DOMAIN,
    clientId: AUTH_CLIENT_ID,
    authorizeTimeoutInSeconds: 10,
    authorizationParams: {
      audience: AUTH_AUDIENCE,
      redirect_uri: window.location.origin,
    },
    onRedirectCallback: (appState?: AppState | undefined) => {
      navigate(appState && appState.returnTo ? appState.returnTo : window.location.pathname)
    },
  }

  return (
    <Auth0Provider {...auth0Config}>
      <TokenWrapper>{children}</TokenWrapper>
    </Auth0Provider>
  )
}

const TokenWrapper = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    if (isAuthenticated) {
      const getToken = async () => {
        const token = await getAccessTokenSilently()
        storage.setToken(token)
      }
      getToken()
    }
  }, [isAuthenticated, getAccessTokenSilently])

  return <>{children}</>
}

export { Auth0 as AuthProvider }
