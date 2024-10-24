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
          const accessExpiresAt = new Date(identity.accessToken.expiresAt)

          if (accessExpiresAt <= now) {
            const refreshExpiresAt = new Date(identity.refreshToken.expiresAt)

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
      partialize: (state) => ({ identity: state.identity }),
    },
  ),
)
