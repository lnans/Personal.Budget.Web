import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div>
      <h3>Dashboard</h3>
      <Link to="/signin">Go to sigin</Link>
    </div>
  )
}
