import '@testing-library/jest-dom/extend-expect'
import crypto from 'crypto'
import { QueryClient, setLogger } from 'react-query'

jest.useFakeTimers()
jest.mock('@plugins/i18n', () => ({
  t: (str: string) => str,
}))
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        languages: ['fr', 'en'],
      },
    }
  },
}))

Object.defineProperty(global.self, 'crypto', {
  value: {
    randomUUID: () => crypto.randomUUID(),
  },
})

export const queryClientForTest = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false, cacheTime: Infinity },
    mutations: {
      retry: false,
    },
  },
})

setLogger({
  log: console.log,
  warn: console.warn,
  // ✅ no more errors on the console
  error: () => {},
})
