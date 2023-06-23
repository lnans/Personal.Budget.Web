import { rest } from 'msw'

import { API_URL } from '@/config'

import mockTags from '../data/mockTags.json'
import { delayedResponse } from '../utils'

export const tagsHandlers = [rest.get(`${API_URL}/tags`, (_1, _2, ctx) => delayedResponse(ctx.json(mockTags)))]
