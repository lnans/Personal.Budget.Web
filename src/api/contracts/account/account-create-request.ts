import { AccountTypeEnum } from 'api/enums'

export type AccountCreateRequest = {
  name: string
  bank: string
  balance: number
  type: AccountTypeEnum
}
