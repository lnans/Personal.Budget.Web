import { DefaultOptions, QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError } from 'axios'

const queryConfig: DefaultOptions = {
  queries: {
    throwOnError: (a: any) => {
      const status = a.response?.status ?? 500 // assume this is a AxiosError, otherwise fallback to 500
      return status >= 500
    },
    refetchOnWindowFocus: false,
    retry: false,
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<ReturnType<FnType>>

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>

export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[0]
>
