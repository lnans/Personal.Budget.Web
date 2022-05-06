import '@testing-library/jest-dom/extend-expect'
import { AxiosResponse } from 'axios'
import crypto from 'crypto'

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

export function createAxiosResponse<T>(data: T) {
  const axiosResponse: AxiosResponse<T, any> = {
    data,
    status: 200,
    config: {},
    headers: {},
    statusText: 'OK',
  }
  return axiosResponse
}
