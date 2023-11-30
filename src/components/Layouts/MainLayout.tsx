import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { LoadingFallback } from '@/components/Fallbacks'

function MainLayout() {
  return (
    <div>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default MainLayout
