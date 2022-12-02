import { Auth0Provider } from '@auth0/auth0-react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const auth0Config = {
  domain: import.meta.env.VITE_AUTH_DOMAIN,
  clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
  audience: import.meta.env.VITE_AUTH_AUDIENCE,
  redirectUri: window.location.origin,
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider {...auth0Config}>
      <App />
    </Auth0Provider>
  </StrictMode>
)
