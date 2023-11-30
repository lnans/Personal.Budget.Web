import Axios, { InternalAxiosRequestConfig } from 'axios'

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

// TODO: handle error, and display a notification
axios.interceptors.response.use((response) => {
  return response.data
})
