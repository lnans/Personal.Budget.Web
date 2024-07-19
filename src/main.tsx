import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'

import { queryClient } from '@/lib/tanstack-query'
import { router } from '@/lib/tanstack-router'

import './main.css'

const rootElement = document.getElementById('app')!

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )
}
