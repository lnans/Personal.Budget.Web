import { useMutation } from '@tanstack/react-query'

import { MutationConfig } from '@/lib/tanstack-query'
import { AuthFormDto, AuthTokensDto } from '@/types/authTypes'

const login = ({ form }: { form: AuthFormDto }): Promise<AuthTokensDto> => {
  // return api.post('/auth/login', form)
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
}

type UseLoginOptions = {
  mutationConfig?: MutationConfig<typeof login>
}

export const useLogin = ({ mutationConfig }: UseLoginOptions = {}) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: login,
  })
}
