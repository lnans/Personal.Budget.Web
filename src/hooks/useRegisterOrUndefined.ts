import { ChangeHandler, Path, RefCallBack, UseFormRegister } from 'react-hook-form'

type RegisterTypes = {
  onBlur: ChangeHandler
  name: string
  min?: string | number | undefined
  max?: string | number | undefined
  maxLength?: number | undefined
  minLength?: number | undefined
  pattern?: string | undefined
  required?: boolean | undefined
  disabled?: boolean | undefined
}

export function useRegisterOrUndefined<TFormValues>(register?: UseFormRegister<TFormValues>, name?: Path<TFormValues>) {
  let inputRef: RefCallBack | undefined
  let onChange: ChangeHandler | undefined
  let formRegister: RegisterTypes | undefined
  if (register && name) {
    ;({ ref: inputRef, onChange, ...formRegister } = register(name))
  }

  return {
    inputRef,
    onChange,
    formRegister,
  }
}
