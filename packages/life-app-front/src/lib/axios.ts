import Axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { ENV } from '@/config/env'
import { useAuthStore } from '@/features/auth/stores/authStore'

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json'
  }

  const bearer = useAuthStore.getState().actions.getBearerToken()
  if (bearer) {
    config.headers.Authorization = bearer
  }

  return config
}

export const api = Axios.create({
  baseURL: ENV.API_URL,
})

api.interceptors.request.use(authRequestInterceptor)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && error.config?.url !== '/api/auth') {
      const searchParams = new URLSearchParams()
      const redirectTo = searchParams.get('redirectTo')
      window.location.href = `/signin?redirectTo=${redirectTo}`
    }

    return Promise.reject(error)
  },
)
