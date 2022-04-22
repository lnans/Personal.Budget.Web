import { AccountDetailsResponse } from '../models/account/AccountDetailsResponse'
import { http, HttpResponse } from './../plugins/axios'
class AccountsService {
  async getAll(): HttpResponse<AccountDetailsResponse[]> {
    return http.get('/accounts')
  }
}

const accountsService = new AccountsService()

export { accountsService }
