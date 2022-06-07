import { OperationType } from './OperationTypeEnum'
export type OperationDetailsResponse = {
  total: number
  operationsByDays: OperationsByDays
}

export type OperationsByDays = {
  [key in string]: OperationDetails[]
}

export type OperationDetails = {
  id: string
  description: string
  tagId: string
  tagName: string
  tagColor: string
  type: OperationType
  accountId: string
  accountName: string
  amount: number
  creationDate: string
  executionDate: string
}
