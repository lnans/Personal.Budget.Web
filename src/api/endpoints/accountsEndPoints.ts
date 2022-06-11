import { Get } from '@api/utils'
import { AccountDetailsResponse } from '@models/account/AccountDetailsResponse'

const CACHE_KEY = 'accounts'
const getAccounts =
  ({ archived = false }) =>
  () =>
    Get<AccountDetailsResponse[]>(`/accounts?archived=${archived}`)

export const accountsRoutes = {
  CACHE_KEY,
  getAccounts,
}
