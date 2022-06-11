import * as Yup from 'yup'

export type CreateAccountRequest = {
  name: string
  bank: string
  icon?: string
  type: string
  initialBalance: number
}

export const CreateAccountRequestValidator = Yup.object().shape({
  name: Yup.string().required('errors.required'),
  bank: Yup.string().required('errors.required'),
  icon: Yup.string(),
  type: Yup.string().required('errors.required'),
  initialBalance: Yup.number().typeError('type error').required('errors.required'),
})
