import { createRootRoute, Outlet } from '@tanstack/react-router'

import { AppErrorFallback } from '@/components/fallbacks/AppErrorFallback'
import AppLoaderFallback from '@/components/fallbacks/AppLoaderFallback'
import { AppRouteNotFoundFallback } from '@/components/fallbacks/AppRouteNotFoundFallback'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
  notFoundComponent: () => <AppRouteNotFoundFallback />,
  errorComponent: () => <AppErrorFallback />,
  loader: () => <AppLoaderFallback />,
})
