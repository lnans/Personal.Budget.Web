import { AccountType } from './AccountTypeEnum'
export class AccountDetailsResponse {
  id = ''
  name = ''
  bank = ''
  icon = ''
  type = AccountType.Savings
  balance = 0
  archived = false
  creationDate = ''
}
