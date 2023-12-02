import { useAuth0 } from '@auth0/auth0-react'
import { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { AppLoader } from '@/components/Elements'
import { storage } from '@/utils/storage'

const CheckAuthProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation('common')
  const { isLoading, isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0()

  useEffect(() => {
    if (isAuthenticated) {
      const getToken = async () => {
        const token = await getAccessTokenSilently()
        storage.setToken(token)
      }
      getToken()
    }
  }, [isAuthenticated, getAccessTokenSilently])

  if (isLoading && !isAuthenticated) {
    return <AppLoader text={t('element.app_loader.authenticating')} />
  }

  if (!isAuthenticated) {
    loginWithRedirect({ appState: { returnTo: window.location.pathname } })
    return <AppLoader text={t('element.app_loader.redirecting')} />
  }

  return <>{children}</>
}

export { CheckAuthProvider }
