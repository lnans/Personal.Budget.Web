import { useQuery } from '@tanstack/react-query'

import { axios } from '@/lib/axios'
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query'

import { TagDto } from '../types'

const getTags = (): Promise<TagDto[]> => axios.get('/tags')

type QueryFnType = typeof getTags

type UseGetTagsOptions = {
  config?: QueryConfig<QueryFnType>
}

export const useGetTags = ({ config }: UseGetTagsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['tags'],
    queryFn: getTags,
    staleTime: 10000,
  })
}
