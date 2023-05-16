import { AccountTypeEnum } from 'api/enums'

export type AccountData = {
  id: string
  name: string
  bank: string
  balance: number
  type: AccountTypeEnum
  isArchived: boolean
}
