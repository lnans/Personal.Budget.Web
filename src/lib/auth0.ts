import { Auth0ProviderOptions } from '@auth0/auth0-react'

import { AUTH_AUDIENCE, AUTH_CLIENT_ID, AUTH_DOMAIN } from '@/config'

export const auth0Config: Auth0ProviderOptions = {
  domain: AUTH_DOMAIN,
  clientId: AUTH_CLIENT_ID,
  authorizeTimeoutInSeconds: 10,
  authorizationParams: {
    audience: AUTH_AUDIENCE,
    redirect_uri: window.location.origin,
  },
}
