import { rest } from 'msw'

import { API_URL } from '@/config'

import accounts from '../data/mockAccounts.json'
import accountSummary from '../data/mockAccountSummary.json'
import { delayedResponse } from '../utils'

export const accountsHandlers = [
  rest.get(`${API_URL}/accounts`, (_1, _2, ctx) => delayedResponse(ctx.json(accounts))),
  rest.get(`${API_URL}/accounts/summary`, (_1, _2, ctx) => delayedResponse(ctx.json(accountSummary))),
]
