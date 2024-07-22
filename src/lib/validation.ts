import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const createSchema = z.object

export function stringRequired() {
  return z.string().min(1, 'form_validation.required')
}

export type InferSchemaType<T extends z.ZodType<any, any>> = z.infer<T>

export const resolver = zodResolver
