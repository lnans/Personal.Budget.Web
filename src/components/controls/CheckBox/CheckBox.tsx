import { useRegisterOrUndefined } from '@hooks/useRegisterOrUndefined'
import clsx from 'clsx'
import { Path, UseFormRegister } from 'react-hook-form'
import { useUID } from 'react-uid'
import './CheckBox.scss'

export interface CheckBoxProps<TFormValues> {
  label: string
  defaultValue: boolean
  compact?: boolean
  disabled?: boolean
  register?: UseFormRegister<TFormValues>
  name?: Path<TFormValues>
}

export default function CheckBox<TFormValues>(props: CheckBoxProps<TFormValues>) {
  const { label, defaultValue, disabled, compact, register, name } = props
  const uid = useUID()
  const { inputRef, onChange, formRegister } = useRegisterOrUndefined(register, name)

  const containerClasses = clsx({
    'checkbox-container': true,
    'checkbox--compact': compact,
    'checkbox--disabled': disabled,
  })

  return (
    <div className={containerClasses}>
      <div className="checkbox-content">
        <input
          id={uid}
          ref={(e) => {
            inputRef && inputRef(e)
          }}
          className="checkbox-input"
          type="checkbox"
          defaultChecked={defaultValue}
          {...formRegister}
          onChange={onChange}
          disabled={!!disabled}
        />
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
