import { toastSender } from '@components'
import ErrorResponse from '@models/common/errorResponse'
import axios, { AxiosResponse } from 'axios'
import i18n from './i18n'

export type HttpResponse<T> = Promise<AxiosResponse<T>>

export const http = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL })

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (config && config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if ([400, 403, 404, 500].includes(err?.response?.status)) {
      const response = err.response.data as ErrorResponse
      toastSender.error(i18n.t('errors.title'), i18n.t(response.message))
    } else if ([401].includes(err?.response?.status)) {
      return Promise.reject(err)
    } else {
      toastSender.error(i18n.t('errors.title'), i18n.t('errors.unhandled_exception'))
    }

    return Promise.reject(err)
  }
)
