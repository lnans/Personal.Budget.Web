export enum AccountTypeEnum {
  Expenses = 'Expenses',
  Savings = 'Savings',
}

export enum OperationTypeEnum {
  Expense = 'Expense',
  Fixe = 'Fixe',
  Transfer = 'Transfer',
  Budget = 'Budget',
}

export type AccountSearchParams = {
  id?: string | null
  type?: AccountTypeEnum | null
}

export type Page<T> = {
  nextCursor: number
  data: T
}
