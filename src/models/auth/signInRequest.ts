import * as Yup from 'yup'

export type SignInRequest = {
  username: string
  password: string
}

export const SignInRequestValidator = Yup.object().shape({
  username: Yup.string().required('errors.required'),
  password: Yup.string().required('errors.required'),
})
