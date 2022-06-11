import { Get } from '@api/utils'
import { AccountDetailsResponse } from '@models/account/AccountDetailsResponse'

const CACHE_KEY = 'accounts'
const getAccounts = () => () => Get<AccountDetailsResponse[]>('/accounts')

export const accountsRoutes = {
  CACHE_KEY,
  getAccounts,
}
