import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, UseFormReturn } from 'react-hook-form'
import * as Yup from 'yup'

export function useFormValidator<TSchema>(validator: Yup.AnyObjectSchema): UseFormReturn<TSchema> {
  return useForm<TSchema>({ resolver: yupResolver(validator) })
}
