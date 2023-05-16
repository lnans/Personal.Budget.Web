import { Auth0ContextInterface } from '@auth0/auth0-react'
import { ErrorResponse } from 'api/contracts'

const apiUrl = import.meta.env.VITE_API_URL

type ErrorHttp = {
  status: number
  body: string
}

async function getAuthorizedHeader(
  auth: Auth0ContextInterface,
  headers?: Headers
): Promise<Headers> {
  const authorizationHeader = new Headers(headers)
  const authToken = await auth.getAccessTokenSilently()
  authorizationHeader.append('Authorization', `Bearer ${authToken}`)
  return authorizationHeader
}

function getContentHeader<TData>(content: TData): Headers {
  const body = JSON.stringify(content)
  const contentHeader = new Headers()
  contentHeader.append('Content-Type', 'application/json')
  contentHeader.append('Content-Length', body.length.toString())
  return contentHeader
}

// eslint-disable-next-line
function getQueryParamsFrom(request?: any): string {
  if (!request) return ''
  const params = new URLSearchParams()

  for (const key in request) {
    if (typeof request[key] === 'object') {
      for (const subKey in request[key]) {
        params.append(key, request[key][subKey])
      }
    } else if (request[key] !== undefined) {
      params.append(key, request[key])
    }
  }

  return `?${params.toString()}`
}

async function parseResponse<TResult>(response: Response): Promise<TResult> {
  const res = response.clone()

  if (response.ok) {
    const responseAsText = await res.text()
    if (responseAsText.length) {
      const result = JSON.parse(responseAsText) as TResult
      return Promise.resolve(result)
    }
    return Promise.resolve({} as TResult)
  }

  const httpError = { status: res.status, body: await res.text() } as ErrorHttp

  if (httpError && httpError.body.length) {
    return Promise.reject(JSON.parse(httpError.body) as ErrorResponse)
  }

  return Promise.reject(httpError)
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

async function Request<TResult>(
  auth: Auth0ContextInterface,
  method: HttpMethod,
  path: string
): Promise<TResult> {
  return fetch(`${apiUrl}${path}`, {
    method,
    headers: await getAuthorizedHeader(auth),
  }).then<TResult>(parseResponse)
}

async function RequestWithBody<TResult, TBody>(
  auth: Auth0ContextInterface,
  method: HttpMethod,
  path: string,
  body: TBody
): Promise<TResult> {
  return fetch(`${apiUrl}${path}`, {
    method,
    headers: await getAuthorizedHeader(auth, getContentHeader(body)),
    body: JSON.stringify(body),
  }).then<TResult>(parseResponse)
}

const Get = async <TResult>(auth: Auth0ContextInterface, path: string) =>
  Request<TResult>(auth, 'GET', path)
const Post = async <TBody, TResult>(auth: Auth0ContextInterface, path: string, body: TBody) =>
  RequestWithBody<TResult, TBody>(auth, 'POST', path, body)
const Put = async <TBody, TResult>(auth: Auth0ContextInterface, path: string, body: TBody) =>
  RequestWithBody<TResult, TBody>(auth, 'PUT', path, body)
const Patch = async <TBody, TResult>(auth: Auth0ContextInterface, path: string, body: TBody) =>
  RequestWithBody<TResult, TBody>(auth, 'PATCH', path, body)
const Delete = async <TResult>(auth: Auth0ContextInterface, path: string) =>
  Request<TResult>(auth, 'DELETE', path)

const http = { Delete, Get, Put, Patch, Post, getQueryParamsFrom }

export { http, getQueryParamsFrom }
