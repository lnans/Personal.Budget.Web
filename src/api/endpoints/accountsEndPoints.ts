import { Get, Post } from '@api/utils'
import { AccountDetailsResponse } from '@models/account/AccountDetailsResponse'
import { CreateAccountRequest } from '@models/account/CreateAccountRequest'

const CACHE_KEY = 'accounts'
const getAccounts =
  ({ archived = false }) =>
  () =>
    Get<AccountDetailsResponse[]>(`/accounts?archived=${archived}`)

const postAccount = (form: CreateAccountRequest) => Post('/accounts', form)

export const accountsRoutes = {
  CACHE_KEY,
  getAccounts,
  postAccount,
}
