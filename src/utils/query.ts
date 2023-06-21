export function getQueryParamsFrom(queryObj?: any) {
  if (!queryObj) return ''
  const params = new URLSearchParams()

  for (const key in queryObj) {
    if (queryObj[key] instanceof Date) {
      params.append(key, queryObj[key].toISOString())
    } else if (typeof queryObj[key] === 'object') {
      for (const subKey in queryObj[key]) {
        params.append(key, queryObj[key][subKey])
      }
    } else if (queryObj[key] !== undefined && queryObj[key] !== '') {
      params.append(key, queryObj[key])
    }
  }

  return params.size ? `?${params.toString()}` : ''
}
