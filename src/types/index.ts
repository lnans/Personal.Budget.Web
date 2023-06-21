export enum AccountTypeEnum {
  Expenses = 'Expenses',
  Savings = 'Savings',
}

export type AccountSearchParams = {
  id?: string | null
  type?: AccountTypeEnum | null
}
