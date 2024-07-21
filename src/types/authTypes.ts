import { z } from 'zod'

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

export const authFormSchema = z.object({
  login: z.string().min(1, 'form.required'),
  password: z.string().min(1, 'form.required'),
})

export type AuthFormDto = z.infer<typeof authFormSchema>
