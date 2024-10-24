import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect } from 'react'

import { Logo } from '@/components/ui/Logo'
import { SignInForm } from '@/features/auth/components/SignInForm'
import { useAuthStore } from '@/features/auth/stores/authStore'

export const Route = createLazyFileRoute('/_auth/signin')({
  component: SignInPage,
})

function SignInPage() {
  const navigate = useNavigate()
  const onSignInSuccess = useCallback(() => navigate({ to: '/' }), [navigate])

  const { getAuthState } = useAuthStore((state) => state.actions)
  const authState = getAuthState()

  useEffect(() => {
    if (authState === 'Authenticated') {
      onSignInSuccess()
    }
  }, [authState, onSignInSuccess])

  return (
    <>
      <Logo size={52} />
      <SignInForm onSuccess={onSignInSuccess} />
    </>
  )
}
