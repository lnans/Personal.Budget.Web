import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  AccountCreateRequest,
  AccountData,
  AccountFacet,
  AccountUpdateRequest,
  ErrorResponse,
} from 'api/contracts'
import { AccountTypeEnum } from 'api/enums'
import { Notifications } from 'components'
import { useTranslation } from 'react-i18next'

const ACCOUNTS_KEY = 'accounts' as const
const ACCOUNTS_FACETS_KEY = 'accounts_facets' as const

// For dev
// -------
const ACCOUNTS = [
  {
    id: '1',
    bank: 'Boursorama Banque',
    name: 'Compte courant',
    type: AccountTypeEnum.Expenses,
    balance: 12560.4,
    isArchived: false,
  },
  {
    id: '2',
    bank: 'Boursorama Banque',
    name: 'Compte sur livret',
    type: AccountTypeEnum.Savings,
    balance: 3453.4,
    isArchived: false,
  },
  {
    id: '3',
    bank: "Caisse d'épargne",
    name: 'Compte courant',
    type: AccountTypeEnum.Expenses,
    balance: -12560.4,
    isArchived: true,
  },
  {
    id: '4',
    bank: 'ING Direct',
    name: 'Compte courant',
    type: AccountTypeEnum.Expenses,
    balance: 0,
    isArchived: true,
  },
  {
    id: '5',
    bank: 'ING Direct',
    name: 'Livret A',
    type: AccountTypeEnum.Savings,
    balance: 0,
    isArchived: true,
  },
]
// --------

function useGetAccounts() {
  return useQuery<AccountData[], ErrorResponse>({
    queryKey: [ACCOUNTS_KEY],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return ACCOUNTS
    },
  })
}

function useGetAccountsFacets() {
  return useQuery<AccountFacet[], ErrorResponse>({
    queryKey: [ACCOUNTS_FACETS_KEY],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const facets: AccountFacet[] = ACCOUNTS.map((account) => ({
        key: account.id,
        id: account.id,
        name: account.name,
        bank: account.bank,
        type: account.type,
        balance: account.balance,
        isArchived: account.isArchived,
      }))

      const sumAccounts: AccountFacet = {
        key: 'sumAccounts',
        name: 'account_list_card.expenses_all',
        balance: ACCOUNTS.filter((account) => account.type === AccountTypeEnum.Expenses).reduce(
          (acc, curr) => acc + curr.balance,
          0
        ),
        type: AccountTypeEnum.Expenses,
        isArchived: false,
      }

      const sumSavings: AccountFacet = {
        key: 'sumSavings',
        name: 'account_list_card.savings_all',
        balance: ACCOUNTS.filter((account) => account.type === AccountTypeEnum.Savings).reduce(
          (acc, curr) => acc + curr.balance,
          0
        ),
        type: AccountTypeEnum.Savings,
        isArchived: false,
      }

      facets.unshift(sumAccounts, sumSavings)

      return facets
    },
  })
}

function useCreateAccount() {
  const { t } = useTranslation()
  const { invalidateQueries } = useQueryClient()

  return useMutation<void, ErrorResponse, AccountCreateRequest>({
    mutationFn: async (form) => {
      console.log(form)
      await new Promise((resolve) => setTimeout(resolve, 500))
    },
    onSettled: (_, error) => {
      if (error === null) invalidateQueries([ACCOUNTS_KEY, ACCOUNTS_FACETS_KEY])
    },
    onError: (error) => {
      Notifications.error({ message: t(error.message) })
    },
  })
}

function useUpdateAccount() {
  const { t } = useTranslation()
  const { invalidateQueries } = useQueryClient()

  return useMutation<void, ErrorResponse, AccountUpdateRequest>({
    mutationFn: async (form) => {
      console.log(form)
      await new Promise((resolve) => setTimeout(resolve, 500))
    },
    onSettled: (_, error) => {
      if (error === null) invalidateQueries([ACCOUNTS_KEY, ACCOUNTS_FACETS_KEY])
    },
    onError: (error) => {
      Notifications.error({ message: t(error.message) })
    },
  })
}

export { useGetAccounts, useGetAccountsFacets, useCreateAccount, useUpdateAccount }
