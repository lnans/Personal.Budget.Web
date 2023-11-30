export const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN
export const AUTH_AUDIENCE = import.meta.env.VITE_AUTH_AUDIENCE
export const AUTH_CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID
export const API_URL = import.meta.env.VITE_API_URL

export const ROUTER_LINKS = {
  wallet: {
    path: '/wallet',
    name: 'navbar:wallet',
    icon: 'icon',
  },
} as const
