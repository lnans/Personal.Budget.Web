import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuthStore } from '@/stores/authStore'
import { AuthTokensDto } from '@/types/authTypes'

const useGetRefreshToken = () => {
  return useMutation({
    mutationFn: (): Promise<AuthTokensDto> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            accessToken: '123',
            claims: {
              firstName: 'John',
              lastName: 'Doe',
              uid: '123',
            },
            expiresAt: new Date().getTime() + 5000,
            refreshToken: {
              expiresIn: 5000,
              refreshToken: '123',
            },
          })
        }, 500)
      })
    },
  })
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const accessToken = useAuthStore((state) => state.accessToken)
  const { setAccessToken } = useAuthStore((state) => state.actions)
  const { mutate: getRefreshToken, data: newAccessToken } = useGetRefreshToken()

  const location = useLocation()
  const tokenTimeoutRef = useRef<number>()

  /** Auto refresh token 1min before expiration */
  useEffect(() => {
    if (accessToken) {
      const expiresIn = accessToken.refreshToken.expiresIn
      clearTimeout(tokenTimeoutRef.current)

      tokenTimeoutRef.current = setTimeout(() => {
        getRefreshToken()
      }, expiresIn)
    }

    return () => {
      clearTimeout(tokenTimeoutRef.current)
    }
  }, [accessToken, getRefreshToken])

  /** Update local storage in case of new access token refreshed */
  useEffect(() => {
    if (newAccessToken) {
      setAccessToken(newAccessToken)
    }
  }, [newAccessToken, setAccessToken])

  if (!accessToken) {
    return <Navigate to={`/auth?redirectTo=${encodeURIComponent(location.pathname)}`} replace />
  }

  return children
}
