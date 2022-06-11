import { Get, objectToQueryString } from '@api/utils'
import { PaginatedData } from '@models/common/paginatedData'
import { OperationDetailsResponse } from '@models/operations/OperationDetailsResponse'
import { OperationDetailsRequest } from '@models/operations/OperationsDetailsRequest'

const CACHE_KEY = 'operations'

const getOperations =
  (queryParam: OperationDetailsRequest) =>
  ({ pageParam = 0 }) =>
    Get<PaginatedData<OperationDetailsResponse>>(`/operations?${objectToQueryString({ ...queryParam, cursor: pageParam })}`)

export const operationsRoutes = {
  CACHE_KEY,
  getOperations,
}
