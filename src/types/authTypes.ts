import { createSchema, InferSchemaType, stringRequired } from '@/lib/validation'

export type RefreshTokenDto = {
  refreshToken: string
  expiresIn: number
}

export type AuthTokensDto = {
  accessToken: string
  expiresAt: number
  claims: {
    uid: string
    firstName: string
    lastName: string
  }
  refreshToken: RefreshTokenDto
}

export const authFormSchema = createSchema({
  login: stringRequired(),
  password: stringRequired(),
})

export type AuthFormDto = InferSchemaType<typeof authFormSchema>
