import { toastSender } from '@components'
import { ErrorResponse, HttpError } from '@models/common/errorResponse'
import i18n from '@plugins/i18n'
import { QueryClient } from 'react-query'

const apiUrl = process.env.VITE_API_BASE_URL
const tokenKey = 'token'
const apiClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
    mutations: {
      retry: false,
    },
  },
})

/**
 * Create an authorization Header
 * @returns Header with Authorization if token exists
 */
const getAuthorizedHeader = (headers?: Headers): Headers => {
  const token = localStorage.getItem(tokenKey)
  const authorizationHeader = new Headers(headers)
  if (token) {
    authorizationHeader.append('Authorization', `Bearer ${localStorage.getItem(tokenKey)}`)
  }
  return authorizationHeader
}

/**
 *  Create an Content Header as application/json
 * @param content Data
 * @returns Header with content type
 */
const getContentHeader = <TData>(content: TData): Headers => {
  const body = JSON.stringify(content)
  const contentHeader = new Headers()
  contentHeader.append('Content-Type', 'application/json')
  contentHeader.append('Content-Length', body.length.toString())
  return contentHeader
}

/**
 * HTTP GET function
 * @param path
 * @returns Promise
 */
const Get = <TResult>(path: string) => fetch(`${apiUrl}${path}`, { headers: getAuthorizedHeader() }).then<TResult>(parseResponse)

/**
 * HTTP POST function
 * @param path
 * @returns Promise
 */
const Post = <TBody, TResult>(path: string, body: TBody) =>
  fetch(`${apiUrl}${path}`, { method: 'POST', headers: getAuthorizedHeader(getContentHeader(body)), body: JSON.stringify(body) }).then<TResult>(parseResponse)

/**
 * HTTP PATCH function
 * @param path
 * @returns Promise
 */
const Patch = <TBody, TResult>(path: string, body: TBody) =>
  fetch(`${apiUrl}${path}`, { method: 'PATCH', headers: getAuthorizedHeader(getContentHeader(body)), body: JSON.stringify(body) }).then<TResult>(parseResponse)

/**
 * HTTP PUT function
 * @param path
 * @returns Promise
 */
const Put = <TBody, TResult>(path: string, body: TBody) =>
  fetch(`${apiUrl}${path}`, { method: 'PUT', headers: getAuthorizedHeader(getContentHeader(body)), body: JSON.stringify(body) }).then<TResult>(parseResponse)

/**
 * HTTP DELETE function
 * @param path
 * @returns Promise
 */
const Delete = <TResult>(path: string) => fetch(`${apiUrl}${path}`, { method: 'DELETE', headers: getAuthorizedHeader() }).then<TResult>(parseResponse)

/**
 * Helper to parse result from API call
 * @param response
 * @returns
 */
async function parseResponse<TResult>(response: Response): Promise<TResult> {
  const res = response.clone()

  // OK result
  if (response.ok) {
    const responseAsText = await res.text()
    if (responseAsText.length) {
      const result = JSON.parse(responseAsText) as TResult
      return Promise.resolve(result)
    }
    return Promise.resolve({} as TResult)
  }

  // Else reject with HttpError, handle by onError from queryClient()
  const httpError = { status: res.status, body: await res.text() } as HttpError

  if (httpError && httpError.body.length) {
    const error = JSON.parse(httpError.body) as ErrorResponse
    toastSender.error(i18n.t('errors.title'), i18n.t(error.message))
  } else if (response.status !== 401) {
    toastSender.error(i18n.t('errors.title'), i18n.t('errors.unhandled_exception'))
  }

  return Promise.reject(httpError)
}

/**
 * Helper to create URL query string from Object
 * @param initialObj Query object to parse
 * @returns URL query string
 */
const objectToQueryString = <TQuery>(initialObj: TQuery): string => {
  /* eslint-disable */
  const reducer =
    (obj: any, parentPrefix = null) =>
    (prev: any, key: any) => {
      const val = obj[key]
      key = encodeURIComponent(key)
      const prefix = parentPrefix ? `${parentPrefix}[${key}]` : key

      if (val == null || typeof val === 'function') {
        prev.push(`${prefix}=`)
        return prev
      }

      if (['number', 'boolean', 'string'].includes(typeof val)) {
        prev.push(`${prefix}=${encodeURIComponent(val)}`)
        return prev
      }

      prev.push(Object.keys(val).reduce(reducer(val, prefix), []).join('&'))
      return prev
    }

  const query: string = Object.keys(initialObj).reduce(reducer(initialObj), []).join('&')

  return query.length > 0 ? query : ''
}

export { apiUrl, apiClient, getAuthorizedHeader, objectToQueryString, parseResponse, Get, Post, Patch, Put, Delete }
