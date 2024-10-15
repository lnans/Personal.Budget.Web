import { useMutation } from '@tanstack/react-query'

import { api } from '@/lib/axios'
import { MutationConfig } from '@/lib/tanstack-query'

import { AuthDto } from '../types/authDto'
import { RefreshTokenRequest } from '../types/refreshTokenRequest'

const refreshToken = async ({ form }: { form: RefreshTokenRequest }) => {
  const response = await api.post<AuthDto>('/api/refresh', form)
  return response.data
}

type UseRefreshTokenOptions = {
  mutationConfig?: MutationConfig<typeof refreshToken>
}

export const useRefreshToken = ({ mutationConfig }: UseRefreshTokenOptions = {}) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: refreshToken,
  })
}
