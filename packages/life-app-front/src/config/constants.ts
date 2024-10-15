export const STORAGE_KEYS = {
  auth: 'life-app-auth',
  theme: 'life-app-theme',
  lang: 'life-app-lang',
} as const

export const API_ROUTES = {
  authenticate: '/auth/login',
  refreshToken: '/auth/refresh',
}
