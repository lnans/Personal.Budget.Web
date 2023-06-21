export const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN
export const AUTH_AUDIENCE = import.meta.env.VITE_AUTH_AUDIENCE
export const AUTH_CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID
export const API_URL = import.meta.env.VITE_API_URL
export const API_MOCKING = import.meta.env.VITE_API_MOCKING

export const NAVIGATION_LINKS = {
  accounts: {
    label: 'appbar.accounts',
    path: '/accounts',
  },
  settings: {
    label: 'appbar.settings',
    path: '/settings',
  },
} as const
