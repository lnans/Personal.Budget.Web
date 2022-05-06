import clsx from 'clsx'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { UseFormRegister, Path, RefCallBack, ChangeHandler } from 'react-hook-form'
import { useUID } from 'react-uid'
import './TextInput.scss'

export type TestFieldType = 'text' | 'password'

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

export interface TextFieldProps<TFormValues> {
  label: string
  defaultValue: string
  error?: string
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  icon?: string
  type?: TestFieldType
  register?: UseFormRegister<TFormValues>
  name?: Path<TFormValues>
}

export default function TextField<TFormValues>(props: TextFieldProps<TFormValues>) {
  const { label, defaultValue, error, loading, disabled, icon, fullWidth, type, name, register } = props
  const uid = useUID()
  const [isEmpty, setIsEmpty] = useState<boolean>(!defaultValue)

  // Conditional hook form settings
  let ref: RefCallBack | undefined
  let onChange: ChangeHandler | undefined
  let formRegister: RegisterTypes | undefined
  if (register && name) {
    ;({ ref, onChange, ...formRegister } = register(name))
  }

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsEmpty(!e.target.value)
    onChange && onChange(e)
  }

  useEffect(() => {
    if ((disabled || loading) && inputRef?.current) {
      inputRef.current.blur()
    }
  }, [disabled, loading])

  const containerClasses = clsx({
    'input-container': true,
    'input--fullWidth': fullWidth,
    'input--disabled': disabled,
    'input--hasIcon': !!icon,
    'input--hasValue': !isEmpty,
  })

  return (
    <div className={containerClasses}>
      <div className="input-content">
        <input
          id={uid}
          className="input"
          ref={(e) => {
            ref && ref(e)
            inputRef.current = e
          }}
          {...formRegister}
          onChange={handleOnChange}
          defaultValue={defaultValue}
          disabled={!!loading || !!disabled}
          type={type ?? 'text'}
          autoComplete="off"
        />
        <label htmlFor={uid} className="input__label">
          {label}
        </label>
        {loading && <div className="input__loader" />}
        {error && (
          <label htmlFor={uid} className="input__message">
            {error}
          </label>
        )}
        {!!icon && !loading && (
          <span className="input__icon" data-testid="input__icon">
            <i className={`bx ${icon}`} />
          </span>
        )}
      </div>
    </div>
  )
}
