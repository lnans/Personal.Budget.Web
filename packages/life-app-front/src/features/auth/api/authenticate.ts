import { useMutation } from '@tanstack/react-query'

import { MutationConfig } from '@/lib/tanstack-query'
import { AuthFormDto, AuthTokensDto } from '@/types/authTypes'

const authenticate = ({ form }: { form: AuthFormDto }): Promise<AuthTokensDto> => {
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
          refreshToken: form.login,
        },
      })
    }, 500)
  })
}

type UseAuthenticateOptions = {
  mutationConfig?: MutationConfig<typeof authenticate>
}

export const useAuthenticate = ({ mutationConfig }: UseAuthenticateOptions = {}) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: authenticate,
  })
}
