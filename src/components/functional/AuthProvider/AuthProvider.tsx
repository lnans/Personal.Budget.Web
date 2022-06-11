import { authenticationRoutes } from '@api/endpoints/authEndPoints'
import { AuthForm } from '@components'
import { AuthInfoResponse } from '@models/auth/authInfoResponse'
import { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import './AuthProvider.scss'

export interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider(props: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const { t } = useTranslation()

  const { isFetching } = useQuery<AuthInfoResponse>(authenticationRoutes.CACHE_KEY, authenticationRoutes.getAuthInfo(), {
    onSuccess: () => setIsAuthenticated(true),
  })

  return (
    <>
      {isFetching ? (
        <div className="auth-loader-container">
          <p>{t('app')}</p>
          <div className="auth-loader" />
        </div>
      ) : (
        <>{!isAuthenticated ? <AuthForm onLogged={setIsAuthenticated}></AuthForm> : props.children}</>
      )}
    </>
  )
}
