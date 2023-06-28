import { DateValue } from '@mantine/dates'

export type OperationsFilterDto = {
  types: string[]
  tags: string[]
  start: DateValue
  end: DateValue
}

export type OperationsRequestDto = {
  search?: string
} & OperationsFilterDto

export const DEFAULT_FILTERS: OperationsFilterDto = {
  types: [],
  tags: [],
  start: null,
  end: null,
}
