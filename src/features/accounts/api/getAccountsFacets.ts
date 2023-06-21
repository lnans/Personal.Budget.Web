import { useQuery } from '@tanstack/react-query'

import { axios } from '@/lib/axios'
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query'

import { AccountFacetDto } from '../types'

const getAccountsFacets = (): Promise<AccountFacetDto[]> => axios.get('/accounts')

type QueryFnType = typeof getAccountsFacets

type UseGetAccountsFacetsOptions = {
  config?: QueryConfig<QueryFnType>
}

export const useGetAccountsFacets = ({ config }: UseGetAccountsFacetsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['accounts-facets'],
    queryFn: getAccountsFacets,
  })
}
