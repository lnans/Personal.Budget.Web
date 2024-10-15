import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { STORAGE_KEYS } from '@/config/constants'

import { AuthDto } from '../types/authDto'

type AuthStoreState = {
  identity?: AuthDto
  actions: {
    setIdentity: (identity: AuthDto) => void
    getBearerToken: () => string
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
        clearIdentity: () => set({ identity: undefined }),
      },
    }),
    {
      name: STORAGE_KEYS.auth,
      partialize: (state) => ({ accessToken: state.identity }),
    },
  ),
)
