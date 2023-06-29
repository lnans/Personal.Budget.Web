import { DateValue } from '@mantine/dates'

import { AccountTypeEnum, OperationTypeEnum } from '@/types'

export type OperationsFilterDto = {
  types: string[]
  tags: string[]
  start: DateValue
  end: DateValue
}

export const DEFAULT_FILTERS: OperationsFilterDto = {
  types: [],
  tags: [],
  start: null,
  end: null,
}

export type OperationsQueryDto = {
  search?: string
  accountId?: string | null
  accountType?: AccountTypeEnum | null
  cursor?: number
  pending?: boolean
} & OperationsFilterDto

export const DEFAULT_QUERY: OperationsQueryDto = {
  ...DEFAULT_FILTERS,
  search: '',
  accountId: null,
  accountType: null,
}

export type OperationDto = {
  id: string
  description: string
  tags: {
    id: string
    name: string
    color: string
  }
  account: {
    id: string
    name: string
  }
  amount: number
  type: OperationTypeEnum
  creationDate: string
  executionDate: string
}
