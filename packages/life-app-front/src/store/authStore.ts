import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { AuthTokensDto } from '@/types/authTypes'

type AuthStoreState = {
  accessToken?: AuthTokensDto
  actions: {
    setAccessToken: (accessToken: AuthTokensDto) => void
    getBearerToken: () => string
    getUsername: () => string
    clearAccessToken: () => void
  }
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, store) => ({
      accessToken: undefined,
      actions: {
        setAccessToken: (accessToken) => set({ accessToken }),
        getBearerToken: () => store().accessToken?.accessToken || '',
        getUsername: () => {
          const { accessToken } = store()
          if (!accessToken) return ''
          return `${accessToken.claims.firstName} ${accessToken.claims.lastName}`
        },
        clearAccessToken: () => set({ accessToken: undefined }),
      },
    }),
    {
      name: 'life-app-auth',
      partialize: (state) => ({ accessToken: state.accessToken }),
    },
  ),
)
