import Axios, { InternalAxiosRequestConfig } from 'axios'

import { env } from '@/config/env'
import { useAuthStore } from '@/store/authStore'

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
  baseURL: env.API_URL,
})

api.interceptors.request.use(authRequestInterceptor)
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams()
      const redirectTo = searchParams.get('redirectTo')
      window.location.href = `/auth/login?redirectTo=${redirectTo}`
    }

    return Promise.reject(error)
  },
)
