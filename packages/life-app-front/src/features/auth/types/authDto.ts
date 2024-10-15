import { AuthTokenDto } from './authTokenDto'

export type AuthDto = {
  username: string
  accessToken: AuthTokenDto
  refreshToken: AuthTokenDto
}
