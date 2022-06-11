import { OperationType } from './OperationTypeEnum'
export type OperationDetailsResponse = {
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
