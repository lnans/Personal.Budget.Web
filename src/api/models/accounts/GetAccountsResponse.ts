import { OperationType } from 'api/enums'

export type GetAccountsResponse = {
  id: string
  name: string
  bank: string
  type: OperationType
  balance: number
  archived: boolean
  creationDate: string
}
