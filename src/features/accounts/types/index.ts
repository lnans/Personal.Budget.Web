import { AccountTypeEnum } from '@/types'

export type AccountFacetDto = {
  key: string
  id?: string
  name: string
  bank?: string
  type: AccountTypeEnum
  balance: number
  isArchived: boolean
}

export type AccountSummaryDto = {
  name: string
  bank?: string
  balance: number
  upcoming: number
  lastOperation: string
}
