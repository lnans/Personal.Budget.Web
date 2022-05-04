import clsx from 'clsx'
import { Fragment, useEffect, useState } from 'react'
import { useUID } from 'react-uid'
import './SelectInput.scss'

export type SelectItem = {
  [key in string]: string
}

export interface SelectProps {
  label: string
  value?: string
  itemKey: string
  itemValue: string
  items: SelectItem[]
  loading?: boolean
  disabled?: boolean
  message?: string
  fullWidth?: boolean
  onChange?: (id: string) => void
}

export default function SelectField(props: SelectProps) {
  const { label, value, items, itemKey, itemValue, onChange, loading, disabled, message, fullWidth } = props
  const [isActive, setIsActive] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string>()
  const [selectedLabel, setLabelValue] = useState<string>()
  const uid = useUID()

  // Set default value
  useEffect(() => {
    if (!!value) {
      const item = items.find((i) => i[itemKey] === value)
      if (item) {
        setSelectedValue(item[itemKey])
        setLabelValue(item[itemValue])
      }
    }
  }, [])

  const handleOnBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (!e.relatedTarget?.id.startsWith('selectItem_')) {
      setIsActive(false)
    }
  }

  const handleOnSelect = (item: SelectItem) => {
    setSelectedValue(item[itemKey])
    setLabelValue(item[itemValue])
    setIsActive(false)
    onChange && onChange(item[itemKey])
  }

  const containerClasses = clsx({
    'select-container': true,
    'select--fulWidth': fullWidth,
    'select--disabled': loading || disabled,
    'select--isActive': isActive,
    'select--hasValue': !!selectedValue,
  })

  return (
    <div className={containerClasses}>
      <div className="select-content">
        <input
          id={uid}
          readOnly
          className="select"
          onFocus={() => !loading && !disabled && setIsActive(true)}
          onBlur={handleOnBlur}
          value={selectedLabel ?? ''}
          disabled={!!loading || !!disabled}
        />
        <label htmlFor={uid} className="select__label">
          {label}
        </label>
        {!loading ? <i className="select__icon" /> : <div className="select__loader" />}
        {message && (
          <label className="select__message" htmlFor={uid}>
            {message}
          </label>
        )}

        {isActive && (
          <div className="select-list-items">
            {items.map((item) => (
              <Fragment key={item[itemKey]}>
                {item.id === selectedValue ? (
                  <button
                    id={`selectItem_${item[itemKey]}`}
                    className="select-list__item select-list__item--selected"
                    data-testid="select-item"
                  >
                    {item[itemValue]}
                  </button>
                ) : (
                  <button
                    id={`selectItem_${item[itemKey]}`}
                    className="select-list__item"
                    onClick={() => handleOnSelect(item)}
                    data-testid="select-item"
                  >
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
