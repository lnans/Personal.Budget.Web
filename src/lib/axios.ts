import Axios, { InternalAxiosRequestConfig } from 'axios'

import { notifyError } from '@/components/Notifications'
import { API_URL } from '@/config'
import { storage } from '@/utils/storage'

function authRequestInterceptor(config: InternalAxiosRequestConfig<any>) {
  const token = storage.getToken()
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  config.headers.Accept = 'application/json'
  return config
}

export const axios = Axios.create({
  baseURL: API_URL,
})

axios.interceptors.request.use(authRequestInterceptor)
axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // don't notify if the request was canceled
    if (error.code !== 'ERR_CANCELED') {
      const message = error.response?.data?.message || error.message
      notifyError({ title: 'Error', message })
    }

    return Promise.reject(error)
  }
)
