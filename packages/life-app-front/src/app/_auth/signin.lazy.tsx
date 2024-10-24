import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'

import { Logo } from '@/components/ui/Logo'
import { SignInForm } from '@/features/auth/components/SignInForm'

export const Route = createLazyFileRoute('/_auth/signin')({
  component: SignInPage,
})

function SignInPage() {
  const navigate = useNavigate()
  const onSignInSuccess = () => navigate({ to: '/' })

  return (
    <>
      <Logo size={52} />
      <SignInForm onSuccess={onSignInSuccess} />
    </>
  )
}
