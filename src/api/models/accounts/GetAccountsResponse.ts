import { AccountType } from 'api/enums'

export type GetAccountsResponse = {
  id: string
  name: string
  bank: string
  type: AccountType
  balance: number
  archived: boolean
  creationDate: string
}
