import { AccountTypeEnum } from 'api/enums'

export type AccountFacet = {
  key: string
  id?: string
  name: string
  bank?: string
  type: AccountTypeEnum
  balance: number
  isArchived: boolean
}
