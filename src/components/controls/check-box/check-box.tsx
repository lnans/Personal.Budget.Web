import clsx from 'clsx'
import { useState } from 'react'
import { useUID } from 'react-uid'
import './check-box.scss'

export interface CheckBoxProps {
  label: string
  value: boolean
  compact?: boolean
  onChange?: (value: boolean) => void
}

export default function CheckBox(props: CheckBoxProps) {
  const { label, value, compact, onChange } = props
  const [isChecked, setIsChecked] = useState<boolean>(value)
  const uid = useUID()

  const handleChange = () => {
    const value = !isChecked
    setIsChecked(value)
    onChange && onChange(value)
  }

  const containerClasses = clsx({
    'checkbox-container': true,
    'checkbox--compact': compact,
  })

  return (
    <div className={containerClasses}>
      <div className="checkbox-content">
        <input id={uid} className="checkbox-input" type="checkbox" defaultChecked={isChecked} onChange={handleChange} />
        <div className="checkbox-mask">
          <i className="checkbox-mask-icon">
            <span className="checkbox-icon-container">
              <div className="checkbox-icon__line1" />
              <div className="checkbox-icon__line2" />
            </span>
          </i>
        </div>
      </div>
      <label htmlFor={uid} className="checkbox-label">
        {label}
      </label>
    </div>
  )
}
