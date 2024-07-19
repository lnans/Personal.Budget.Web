import { DefaultOptions, QueryClient } from '@tanstack/react-query'

const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 0,
  },
} satisfies DefaultOptions

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
})
