import Axios, { InternalAxiosRequestConfig } from 'axios'

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
  (error) => {
    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams()
      const redirectTo = searchParams.get('redirectTo')
      window.location.href = `/auth/login?redirectTo=${redirectTo}`
    }

    return Promise.reject(error)
  },
)
