import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { MutationConfig } from '@/lib/tanstack-query'

import { SignOutRequest } from '../types/signOutRequest'

const signOut = async ({ form }: { form: SignOutRequest }) => {
  await api.delete<void>('/api/auth', { data: form })
  return
}

type UseSignOutOptions = {
  mutationConfig?: MutationConfig<typeof signOut>
}

export const useSignOut = ({ mutationConfig }: UseSignOutOptions = {}) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: signOut,
  })
}
