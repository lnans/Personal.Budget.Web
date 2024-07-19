import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="flex items-center justify-center p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}
