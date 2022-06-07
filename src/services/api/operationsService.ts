import { OperationDetailsResponse } from '@models/operations/OperationDetailsResponse'
import { OperationDetailsRequest } from '@models/operations/OperationsDetailsRequest'
import { http, HttpResponse } from '@plugins/axios'

/* eslint-disable-next-line */
const objectToQueryString = (initialObj: any): string => {
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

  return Object.keys(initialObj).reduce(reducer(initialObj), []).join('&')
}

class OperationService {
  async getOperations(query: OperationDetailsRequest): HttpResponse<OperationDetailsResponse> {
    const queryParams = objectToQueryString(query)

    return http.get('/operations?' + queryParams)
  }
}

const operationsService = new OperationService()

export default operationsService
