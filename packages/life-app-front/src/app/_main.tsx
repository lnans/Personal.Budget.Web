import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'

import AuthLoader from '@/features/auth/components/AuthLoader'

export const Route = createFileRoute('/_main')({
  component: MainLayout,
})

function MainLayout() {
  const navigate = useNavigate()
  const onAuthRedirect = () => navigate({ to: '/signin' })

  return (
    <>
      <AuthLoader onRedirect={onAuthRedirect}>
        <div>MainLayout</div>
        <Outlet />
      </AuthLoader>
    </>
  )
}
