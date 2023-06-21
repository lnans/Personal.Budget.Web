import { useQuery } from '@tanstack/react-query'

import { axios } from '@/lib/axios'
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query'
import { AccountSearchParams } from '@/types'
import { getQueryParamsFrom } from '@/utils'

import { AccountSummaryDto } from '../types'

const getAccountSummary = (filter?: AccountSearchParams): Promise<AccountSummaryDto> =>
  axios.get(`/accounts/summary${getQueryParamsFrom(filter)}`)

type QueryFnType = typeof getAccountSummary

type UseGetAccountSummaryOptions = {
  filter?: AccountSearchParams
  config?: QueryConfig<QueryFnType>
}

export const useGetAccountSummary = ({ filter, config }: UseGetAccountSummaryOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['account-summary', filter],
    queryFn: () => getAccountSummary(filter),
  })
}
