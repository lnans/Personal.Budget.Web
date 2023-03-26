import { Auth0ContextInterface } from '@auth0/auth0-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AccountType } from 'api/enums'
import { CreateAccountRequest, ErrorResponse, GetAccountsRequest, GetAccountsResponse, PaginatedList } from 'api/models'

const ACCOUNTS_KEY = 'accounts'

function useGetAccounts(auth: Auth0ContextInterface, getAccountsRequest: GetAccountsRequest) {
  return useQuery<PaginatedList<GetAccountsResponse>, ErrorResponse>([ACCOUNTS_KEY, getAccountsRequest], async () =>
    //http.Get<PaginatedList<GetAccountsResponse>>(auth, `/accounts${getQueryParamsFrom(getAccountsRequest)}`)
    {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        page: 0,
        totalElements: 3,
        totalPages: 1,
        items: [
          {
            id: '1',
            name: 'test 1',
            bank: 'bank',
            type: AccountType.Expenses,
            balance: 130,
            archived: false,
            creationDate: '2023-03-03T13:06:16.765Z',
          },
          {
            id: '2',
            name: 'test 2',
            bank: 'bank',
            type: AccountType.Savings,
            balance: 0,
            archived: false,
            creationDate: '2023-03-03T13:06:16.765Z',
          },
          {
            id: '3',
            name: 'test 3',
            bank: 'bank',
            type: AccountType.Expenses,
            balance: -130,
            archived: false,
            creationDate: '2023-03-03T13:06:16.765Z',
          },
        ],
      }
    }
  )
}

function usePostAccount() {
  return useMutation<void, ErrorResponse, CreateAccountRequest>((_form) => {
    return new Promise((resolve) => setTimeout(resolve, 500))
  })
}

function useDeleteAccount() {
  return useMutation<void, ErrorResponse, string>((_accountId) => {
    return new Promise((resolve) => setTimeout(resolve, 500))
  })
}

export { ACCOUNTS_KEY, useGetAccounts, usePostAccount, useDeleteAccount }
