import { InferSchemaType } from '@/lib/validation'

import { signInRequestValidator } from './signInRequestValidator'

export type SignInRequest = InferSchemaType<typeof signInRequestValidator>
