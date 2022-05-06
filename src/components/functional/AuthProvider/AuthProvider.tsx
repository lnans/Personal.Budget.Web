import { AuthForm } from '@components'
import { AuthService } from '@services'
import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './AuthProvider.scss'

export interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider(props: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const { t } = useTranslation()

  const checkAuthentication = async () => {
    try {
      const authService = new AuthService()
      await authService
        .getAuthInfo()
        .then(() => setIsAuthenticated(true))
        .finally(() => setIsLoading(false))
    } catch {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkAuthentication()
  }, [])
  return (
    <>
      {isLoading ? (
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
