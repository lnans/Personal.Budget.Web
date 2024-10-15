import { createSchema, stringRequired } from '@/lib/validation'

export const refreshTokenRequestValidator = createSchema({
  refreshToken: stringRequired(),
})
