import { useOuterClick } from '@hooks/useOuterClick'
import { useRegisterOrUndefined } from '@hooks/useRegisterOrUndefined'
import clsx from 'clsx'
import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react'
import { UseFormRegister, Path } from 'react-hook-form'
import { useUID } from 'react-uid'
import './SelectInput.scss'

export type SelectItem = {
  [key in string]: string
}

export interface SelectProps<TFormValues> {
  label: string
  defaultValue?: string
  itemKey: string
  itemValue: string
  items: SelectItem[]
  loading?: boolean
  disabled?: boolean
  error?: string
  fullWidth?: boolean
  register?: UseFormRegister<TFormValues>
  name?: Path<TFormValues>
}

export default function SelectField<TFormValues>(props: SelectProps<TFormValues>) {
  const { label, defaultValue, items, itemKey, itemValue, loading, disabled, error, fullWidth, register, name } = props
  const [isActive, setIsActive] = useState(false)
  const [value, setValue] = useState<string>()
  const [labelValue, setLabelValue] = useState<string>()
  const uid = useUID()
  const selectRef = useOuterClick<HTMLDivElement>(() => setIsActive(false))
  const { inputRef, onChange, formRegister } = useRegisterOrUndefined(register, name)
  const _inputRef = useRef<HTMLInputElement | null>(null)

  // Set default value
  useEffect(() => {
    if (!!defaultValue) {
      const item = items.find((i) => i[itemKey] === defaultValue)
      if (item) {
        setValue(item[itemKey])
        setLabelValue(item[itemValue])
      }
    }
  }, [])

  /**
   * Select event on list
   * Trigger native input event to use value input and react hook form
   * @param {SelectItem} item Selected item
   */
  const onSelectItem = (item: SelectItem) => {
    setLabelValue(item[itemValue])

    const nativeInputSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
    nativeInputSetter?.call(_inputRef.current, item[itemKey])

    const e = new Event('input', { bubbles: true })
    _inputRef.current?.dispatchEvent(e)
  }

  const nativeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setIsActive(false)
    onChange && onChange(e)
  }

  const containerClasses = clsx({
    'select-container': true,
    'select--fulWidth': fullWidth,
    'select--disabled': loading || disabled,
    'select--isActive': isActive,
    'select--hasValue': !!value,
  })

  return (
    <div ref={selectRef} className={containerClasses}>
      <div className="select-content">
        <input
          id={uid}
          readOnly
          className="select"
          ref={(e) => {
            inputRef && inputRef(e)
            _inputRef.current = e
          }}
          {...formRegister}
          onFocus={() => !loading && !disabled && setIsActive(true)}
          onChange={nativeInputChange}
          defaultValue={defaultValue}
          disabled={!!loading || !!disabled}
        />
        <label htmlFor={uid} className="select__label">
          {label}
        </label>
        <label htmlFor={uid} className="select__value">
          {labelValue}
        </label>
        {!loading ? <i className="select__icon" /> : <div className="select__loader" />}
        {error && (
          <label className="select__error" htmlFor={uid}>
            {error}
          </label>
        )}

        {isActive && (
          <div className="select-list-items">
            {items.map((item) => (
              <Fragment key={item[itemKey]}>
                {item.id === value ? (
                  <button id={`selectItem_${item[itemKey]}`} className="select-list__item select-list__item--selected" data-testid="select-item">
                    {item[itemValue]}
                  </button>
                ) : (
                  <button id={`selectItem_${item[itemKey]}`} className="select-list__item" onClick={() => onSelectItem(item)} data-testid="select-item">
                    {item[itemValue]}
                  </button>
                )}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
