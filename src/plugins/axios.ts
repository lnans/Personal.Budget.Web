import axios, { AxiosResponse } from 'axios'

export type HttpResponse<T> = Promise<AxiosResponse<T>>

export const http = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL })
