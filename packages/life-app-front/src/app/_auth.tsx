import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="flex h-dvh max-h-dvh flex-col items-center justify-center gap-4 p-6">
      <Outlet />
    </div>
  )
}
