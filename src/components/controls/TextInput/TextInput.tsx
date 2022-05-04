import clsx from 'clsx'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useUID } from 'react-uid'
import './TextInput.scss'

export type TestFieldType = 'text' | 'password'

export interface TextFieldProps {
  label: string
  value: string
  message?: string
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  icon?: string
  type?: TestFieldType
  onChange?: (value: string | number) => void
  onEnterKey?: () => void
}

export default function TextField(props: TextFieldProps) {
  const { label, message, loading, disabled, icon, fullWidth, type, onChange, onEnterKey } = props
  const [value, setValue] = useState(props.value)
  const uid = useUID()

  const ref = useRef<HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange && onChange(e.target.value)
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnterKey && onEnterKey()
    }
  }

  useEffect(() => {
    if ((disabled || loading) && ref?.current) {
      ref.current.blur()
    }
  }, [disabled, loading])

  const containerClasses = clsx({
    'input-container': true,
    'input--fullWidth': fullWidth,
    'input--disabled': disabled,
    'input--hasIcon': !!icon,
    'input--hasValue': !!value,
  })

  return (
    <div className={containerClasses}>
      <div className="input-content">
        <input
          id={uid}
          className="input"
          ref={ref}
          defaultValue={value}
          onChange={handleChange}
          onKeyUp={handleEnterKey}
          disabled={!!loading || !!disabled}
          type={type ?? 'text'}
          autoComplete="off"
        />
        <label htmlFor={uid} className="input__label">
          {label}
        </label>
        {loading && <div className="input__loader" />}
        {message && (
          <label htmlFor={uid} className="input__message">
            {message}
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
