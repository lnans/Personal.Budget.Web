import * as Yup from 'yup'

export type PatchAccountRequest = {
  name: string
  bank: string
}

export const PatchAccountRequestValidator = Yup.object().shape({
  name: Yup.string().required('errors.required'),
  bank: Yup.string().required('errors.required'),
})
