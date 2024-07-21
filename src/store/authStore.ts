import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { AuthTokensDto } from '@/types/authTypes'

type AuthStoreState = {
  accessToken?: AuthTokensDto
  actions: {
    setAccessToken: (accessToken: AuthTokensDto) => void
    getBearerToken: () => string
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
        clearAccessToken: () => set({ accessToken: undefined }),
      },
    }),
    {
      name: 'auth-token-storage',
      partialize: (state) => ({ accessToken: state.accessToken }),
    },
  ),
)
