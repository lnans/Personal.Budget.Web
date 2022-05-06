//import { useState } from 'react'
import clsx from 'clsx'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { ChangeHandler, Path, RefCallBack, UseFormRegister } from 'react-hook-form'
import { useUID } from 'react-uid'
import './CurrencyInput.scss'

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

export interface CurrencyInputProps<TFormValues> {
  label: string
  defaultValue?: number
  error?: string
  disabled?: boolean
  fullWidth?: boolean
  register?: UseFormRegister<TFormValues>
  name?: Path<TFormValues>
}

export default function CurrencyInput<TFormValues>(props: CurrencyInputProps<TFormValues>) {
  const { label, defaultValue, error, disabled, fullWidth, register, name } = props
  const defaultMask = '__.__€'
  const uid = useUID()
  const [mask, setMask] = useState(defaultMask)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Conditional hook form settings
  let ref: RefCallBack | undefined
  let onChange: ChangeHandler | undefined
  let formRegister: RegisterTypes | undefined
  if (register && name) {
    ;({ ref, onChange, ...formRegister } = register(name))
  }

  const calculateMask = (value: string): string => {
    let mask = ''
    for (let index = 0; index < value.length; index++) {
      mask += '\u2000'
    }
    mask += '  €'
    return mask
  }

  useEffect(() => {
    if (defaultValue !== undefined) {
      setMask(calculateMask(defaultValue.toString()))
    }
  }, [])

  useEffect(() => {
    if (disabled && inputRef?.current) {
      inputRef.current.blur()
    }
  }, [disabled])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e)

    const isValid = e.target.validity.valid
    const isEmpty = e.target.value.length === 0
    if (!isValid) {
      setMask('')
      return
    }

    if (isValid && isEmpty) {
      setMask(defaultMask)
      return
    }

    setMask(calculateMask(e.target.value))
  }

  const containerClasses = clsx({
    'currency-input-container': true,
    'currency-input--fullWidth': fullWidth,
    'currency-input--disabled': disabled,
  })

  return (
    <div className={containerClasses}>
      <div className="currency-input-content">
        <input
          ref={(e) => {
            ref && ref(e)
            inputRef.current = e
          }}
          {...formRegister}
          id={uid}
          className="currency-input"
          defaultValue={defaultValue ?? ''}
          disabled={!!disabled}
          type="number"
          step="0.01"
          lang="en"
          onChange={handleChange}
        />
        <label htmlFor={uid} className="currency-input__label">
          {label}
        </label>
        {error && (
          <label htmlFor={uid} className="currency-input__message">
            {error}
          </label>
        )}
        <span className="currency-input__mask" data-testid="currency-mask">
          {mask}
        </span>
      </div>
    </div>
  )
}
