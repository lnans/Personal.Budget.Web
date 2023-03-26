import { AppState, Auth0Provider, useAuth0, User } from '@auth0/auth0-react'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Define props
type AuthContextProps = {
  user?: User
  logout: () => void
}

type AuthProviderProps = {
  children: ReactNode
}

// Create context and hooks
const AuthContext = createContext<AuthContextProps>({ logout: () => {} })
const useAuthContext = () => useContext(AuthContext)

// Wrap Auth0 provider config
const Auth0 = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  const onRedirectCallback = (appState?: AppState | undefined) => {
    navigate(appState && appState.returnTo ? appState.returnTo : window.location.pathname)
  }

  const auth0Config = {
    domain: import.meta.env.VITE_AUTH_DOMAIN,
    clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
    audience: import.meta.env.VITE_AUTH_AUDIENCE,
    onRedirectCallback,
  }

  return (
    <Auth0Provider {...auth0Config} authorizationParams={{ redirect_uri: window.location.origin }}>
      {children}
    </Auth0Provider>
  )
}

// Custom Auth provider
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>()
  const { user: auth0user, isAuthenticated, loginWithRedirect, logout, isLoading, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    if (isAuthenticated) {
      setUser(auth0user)
    }

    if (!isAuthenticated && !isLoading) {
      loginWithRedirect()
    }
  }, [isAuthenticated, isLoading])

  return (
    <Auth0>
      <AuthContext.Provider value={{ user, logout }}>{isLoading || !isAuthenticated ? <div>loading</div> : children}</AuthContext.Provider>
    </Auth0>
  )
}

export { AuthProvider, useAuthContext }
