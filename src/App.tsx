import { AppState, Auth0Provider, User } from '@auth0/auth0-react'
import { AuthLoader } from 'components'
import { useNavigate } from 'react-router-dom'
import { Router } from 'router'

import ThemeProvider from 'theme'

function App() {
  const navigate = useNavigate()

  const onRedirectCallback = (appState?: AppState | undefined, user?: User | undefined) => {
    console.log(appState)
    navigate(appState && appState.returnTo ? appState.returnTo : window.location.pathname)
  }

  const auth0Config = {
    domain: import.meta.env.VITE_AUTH_DOMAIN,
    clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
    audience: import.meta.env.VITE_AUTH_AUDIENCE,
    redirectUri: window.location.origin,
    onRedirectCallback,
  }

  return (
    <Auth0Provider {...auth0Config}>
      <ThemeProvider>
        <AuthLoader>
          <Router />
        </AuthLoader>
      </ThemeProvider>
    </Auth0Provider>
  )
}

export default App
