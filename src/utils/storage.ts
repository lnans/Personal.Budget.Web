import { STORAGE_PREFIX } from '@/config'

export const storage = {
  getToken: () => JSON.parse(window.localStorage.getItem(`${STORAGE_PREFIX}token`) as string),
  setToken: (token: string) => window.localStorage.setItem(`${STORAGE_PREFIX}token`, JSON.stringify(token)),
  clearToken: () => window.localStorage.removeItem(`${STORAGE_PREFIX}token`),

  getTheme: () => window.localStorage.getItem(`${STORAGE_PREFIX}theme`),
  setTheme: (theme: 'light' | 'dark') => window.localStorage.setItem(`${STORAGE_PREFIX}theme`, theme),
}
