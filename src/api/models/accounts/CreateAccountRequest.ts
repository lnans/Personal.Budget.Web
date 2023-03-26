import { AccountType } from 'api/enums'
import * as Yup from 'yup'

export type CreateAccountRequest = {
  name: string
  bank: string
  initialBalance: number
  type: AccountType
}

export const CreateAccountValidator = Yup.object().shape({
  name: Yup.string().required('common.required'),
  bank: Yup.string().required('common.required'),
  initialBalance: Yup.number().typeError('common.required').required('common.required'),
  type: Yup.string().required('common.required'),
})
