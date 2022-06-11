//import { useState } from 'react'
import { useRegisterOrUndefined } from '@hooks/useRegisterOrUndefined'
import clsx from 'clsx'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Path, UseFormRegister } from 'react-hook-form'
import { useUID } from 'react-uid'
import './CurrencyInput.scss'

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

  // Conditional hook form settings
  const { inputRef, onChange, formRegister } = useRegisterOrUndefined(register, name)
  const _inputRef = useRef<HTMLInputElement | null>(null)

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
    if (disabled && _inputRef?.current) {
      _inputRef.current.blur()
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
            inputRef && inputRef(e)
            _inputRef.current = e
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
