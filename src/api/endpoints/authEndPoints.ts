import { SignInResponse } from '@models/auth/signInResponse'
import { Get, Post } from '@api/utils'
import { AuthInfoResponse } from '@models/auth/authInfoResponse'
import { SignInRequest } from '@models/auth/signInRequest'

const CACHE_KEY = 'auth'

const getAuthInfo = () => () => Get<AuthInfoResponse>('/auth')

const signIn = (form: SignInRequest) => Post<SignInRequest, SignInResponse>('/auth/signin', form)

export const authenticationRoutes = {
  CACHE_KEY,
  getAuthInfo,
  signIn,
}
