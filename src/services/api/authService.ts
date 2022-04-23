import AuthInfoResponse from '@models/auth/authInfoResponse'
import SignInRequest from '@models/auth/signInRequest'
import SignInResponse from '@models/auth/signInResponse'
import { http, HttpResponse } from '@plugins/axios'

class AuthService {
  async getAuthInfo(): HttpResponse<AuthInfoResponse> {
    return http.get<AuthInfoResponse>('/auth')
  }

  async signIn(request: SignInRequest): Promise<void> {
    const response = await http.post<SignInResponse>('/auth/signin', request)
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token)
    }
  }
}

const authService = new AuthService()

export default authService
