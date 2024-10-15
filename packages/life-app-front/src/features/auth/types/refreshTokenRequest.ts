import { InferSchemaType } from '@/lib/validation'

import { refreshTokenRequestValidator } from './refreshTokenRequestValidator'

export type RefreshTokenRequest = InferSchemaType<typeof refreshTokenRequestValidator>
