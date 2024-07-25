import { Navigate } from 'react-router-dom'

import { useAuthStore } from '@/store/authStore'

export function RootPage() {
  const accessToken = useAuthStore((state) => state.accessToken)

  if (accessToken) {
    return <Navigate to="/app" />
  }

  return <Navigate to="/auth" />
}
