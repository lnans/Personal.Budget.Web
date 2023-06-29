import { rest } from 'msw'

import { API_URL } from '@/config'

import mockOperations from '../data/mockOperations.json'
import { delayedResponse } from '../utils'

export const operationsHandlers = [rest.get(`${API_URL}/operations`, (_1, _2, ctx) => delayedResponse(ctx.json(mockOperations)))]
