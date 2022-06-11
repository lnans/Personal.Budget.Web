import { Delete, Get, Patch, Post } from '@api/utils'
import { AccountDetailsResponse } from '@models/account/AccountDetailsResponse'
import { CreateAccountRequest } from '@models/account/CreateAccountRequest'
import { PatchAccountRequest } from '@models/account/PatchAccountRequest'

const CACHE_KEY = 'accounts'

const getAccounts =
  ({ archived = false }) =>
  () =>
    Get<AccountDetailsResponse[]>(`/accounts?archived=${archived}`)

const postAccount = (form: CreateAccountRequest) => Post('/accounts', form)

const patchAccount = (id: string) => (form: PatchAccountRequest) => Patch(`/accounts/${id}`, form)

const archiveAccount = (id: string, archived: boolean) => () => Patch(`/accounts/${id}/archive`, { archived })

const deleteAccount = (id: string) => () => Delete(`/accounts/${id}`)

export const accountsRoutes = {
  CACHE_KEY,
  getAccounts,
  postAccount,
  patchAccount,
  archiveAccount,
  deleteAccount,
}
