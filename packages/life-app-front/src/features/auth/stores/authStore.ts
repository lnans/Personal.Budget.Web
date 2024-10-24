import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { STORAGE_KEYS } from '@/config/constants'

import { AuthDto } from '../types/authDto'

type AuthStoreState = {
  identity?: AuthDto
  actions: {
    setIdentity: (identity: AuthDto) => void
    getBearerToken: () => string
    getAuthState: () => 'NotAuthenticated' | 'AccessExpired' | 'Authenticated'
    clearIdentity: () => void
  }
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      identity: undefined,
      actions: {
        setIdentity: (identity) => set({ identity }),
        getBearerToken: () => {
          const { identity } = get()
          if (!identity) return ''
          return `Bearer ${identity.accessToken.token}`
        },
        getAuthState: () => {
          const { identity } = get()
          if (!identity) return 'NotAuthenticated'

          const now = new Date()
          const accessExpiresIn = identity.accessToken.expiresIn
          const accessExpiresAt = new Date(now.getTime() + accessExpiresIn * 1000)

          if (accessExpiresAt <= now) {
            const refreshExpiresIn = identity.refreshToken.expiresIn
            const refreshExpiresAt = new Date(now.getTime() + refreshExpiresIn * 1000)

            if (refreshExpiresAt <= now) {
              return 'NotAuthenticated' // all token are expired
            }

            return 'AccessExpired'
          }

          return 'Authenticated'
        },
        clearIdentity: () => set({ identity: undefined }),
      },
    }),
    {
      name: STORAGE_KEYS.auth,
      partialize: (state) => ({ accessToken: state.identity }),
    },
  ),
)
