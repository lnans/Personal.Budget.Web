import { createSchema, stringRequired } from '@/lib/validation'

export const signInRequestValidator = createSchema({
  username: stringRequired(),
  password: stringRequired(),
})
