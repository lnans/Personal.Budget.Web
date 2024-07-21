import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet, useLocation } from 'react-router-dom'

export function AppRoute() {
  const location = useLocation()

  return (
    <Suspense fallback={<div className="flex size-full items-center justify-center">...loading</div>}>
      <ErrorBoundary key={location.pathname} fallback={<div>Something went wrong!</div>}>
        mainlayout -------
        <Outlet />
      </ErrorBoundary>
    </Suspense>
  )
}
