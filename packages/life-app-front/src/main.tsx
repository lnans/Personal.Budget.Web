/* eslint-disable react-refresh/only-export-components */
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { lazy, StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { Toaster } from '@/components/ui/Toaster'
import { queryClient } from '@/lib/tanstack-query'
import QueryClientProvider from '@/providers/QueryClientProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { TranslationProvider } from '@/providers/TranslationProvider'

import { routeTree } from './routeTree.gen'

import './main.css'

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : lazy(() =>
      // Lazy load in development
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    )

// Render the app
const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <TranslationProvider>
        <ThemeProvider>
          <QueryClientProvider>
            <Toaster />
            <RouterProvider router={router} />
            <TanStackRouterDevtools router={router} />
          </QueryClientProvider>
        </ThemeProvider>
      </TranslationProvider>
    </StrictMode>,
  )
}
