import { OperationType } from './OperationTypeEnum'

export interface OperationDetailsRequest {
  accountId?: string
  description?: string
  tagIds?: string[]
  type?: OperationType
}
