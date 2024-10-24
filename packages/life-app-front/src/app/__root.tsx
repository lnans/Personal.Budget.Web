import { createRootRoute, Outlet } from '@tanstack/react-router'

import { AppErrorFallback } from '@/components/fallbacks/AppErrorFallback'
import { AppRouteNotFoundFallback } from '@/components/fallbacks/AppRouteNotFoundFallback'

export const Route = createRootRoute({
  component: RoutePage,
  notFoundComponent: () => <AppRouteNotFoundFallback />,
  errorComponent: () => <AppErrorFallback />,
})

function RoutePage() {
  return <Outlet />
}
