import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { MutationConfig } from '@/lib/tanstack-query'

import { AuthDto } from '../types/authDto'
import { SignInRequest } from '../types/signInRequest'

const signIn = async ({ form }: { form: SignInRequest }) => {
  const response = await api.post<AuthDto>('/api/auth', form)
  return response.data
}

type UseSignInOptions = {
  mutationConfig?: MutationConfig<typeof signIn>
}

export const useSignIn = ({ mutationConfig }: UseSignInOptions = {}) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: signIn,
  })
}
