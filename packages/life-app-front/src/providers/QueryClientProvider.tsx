import { QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools as TanstackReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'

import { queryClient } from '@/lib/tanstack-query'

type QueryClientProviderProps = {
  children: ReactNode
}

function QueryClientProvider({ children }: QueryClientProviderProps) {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
      <TanstackReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </TanstackQueryClientProvider>
  )
}

export default QueryClientProvider
