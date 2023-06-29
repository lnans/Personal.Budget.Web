import { accountsHandlers } from './mockAccounts'
import { operationsHandlers } from './mockOperations'
import { tagsHandlers } from './mockTags'

export const handlers = [...accountsHandlers, ...tagsHandlers, ...operationsHandlers]
