import { Auth0ContextInterface } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import { ErrorResponse, GetAccountsRequest, GetAccountsResponse, PaginatedList } from 'api/models'

import { getQueryParamsFrom, http } from '../http'

function useGetAccounts(auth: Auth0ContextInterface, getAccountsRequest: GetAccountsRequest) {
  return useQuery<PaginatedList<GetAccountsResponse>, ErrorResponse>([getAccountsRequest], async () =>
    http.Get<PaginatedList<GetAccountsResponse>>(auth, `/accounts${getQueryParamsFrom(getAccountsRequest)}`)
  )
}

export { useGetAccounts }
