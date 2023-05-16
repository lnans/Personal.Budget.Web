import { AppState, Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth0 = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  const auth0Config: Auth0ProviderOptions = {
    domain: import.meta.env.VITE_AUTH_DOMAIN,
    clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
    authorizeTimeoutInSeconds: 10,
    authorizationParams: {
      audience: import.meta.env.VITE_AUTH_AUDIENCE,
      redirect_uri: window.location.origin,
    },
    onRedirectCallback: (appState?: AppState | undefined) => {
      navigate(appState && appState.returnTo ? appState.returnTo : window.location.pathname)
    },
  }

  return <Auth0Provider {...auth0Config}>{children}</Auth0Provider>
}

export { Auth0 as AuthProvider }
