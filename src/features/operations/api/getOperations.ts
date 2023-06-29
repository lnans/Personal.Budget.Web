import { useInfiniteQuery } from '@tanstack/react-query'

import { axios } from '@/lib/axios'
import { ExtractFnReturnType, InfiniteQueryConfig } from '@/lib/react-query'
import { Page } from '@/types'
import { getQueryParamsFrom } from '@/utils'

import { OperationDto, OperationsQueryDto } from '../types'

const getOperations = (query?: OperationsQueryDto, signal?: AbortSignal): Promise<Page<OperationDto[]>> =>
  axios.get(`/operations${getQueryParamsFrom(query)}`, { signal })

type QueryFnType = typeof getOperations

type UseGetOperationsOptions = {
  query: OperationsQueryDto
  config?: InfiniteQueryConfig<QueryFnType>
}

export const UseGetOperations = ({ query, config }: UseGetOperationsOptions) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['operations', query],
    queryFn: ({ pageParam = 0, signal }) => getOperations({ ...query, cursor: pageParam }, signal),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    cacheTime: 0,
  })
}
