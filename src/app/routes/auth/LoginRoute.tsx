import { useNavigate, useSearchParams } from 'react-router-dom'

import { Logo } from '@/components/ui/Logo'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { useAuthStore } from '@/store/authStore'
import { AuthTokensDto } from '@/types/authTypes'

export function LoginRoute() {
  const { setAccessToken } = useAuthStore((state) => state.actions)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')

  const onSuccess = (authToken: AuthTokensDto) => {
    setAccessToken(authToken)
    navigate(`${redirectTo ? `${redirectTo}` : '/app'}`, {
      replace: true,
    })
  }
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center">
        <div className="mb-6 inline-flex items-center gap-4 text-4xl font-bold">
          <Logo size={46} />
          <p className="text-neutral-950 dark:text-neutral-100">Life app</p>
        </div>
        <LoginForm className="mb-24" onSuccess={onSuccess} />
      </div>
    </div>
  )
}
