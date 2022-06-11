import { ChangeEvent, useState } from 'react'
import './SwitchInput.scss'

export interface SwitchInputProps {
  textOn: string
  textOff: string
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

export default function SwitchInput(props: SwitchInputProps) {
  const { textOn, textOff, defaultChecked, onChange } = props
  const [value, setValue] = useState<boolean>(defaultChecked ?? false)

  const onSwitchChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked)
    onChange && onChange(e.target.checked)
  }

  return (
    <div className="switch">
      <input className="switch__input" type="checkbox" checked={value} onChange={onSwitchChangeInput} />
      <div className="switch__circle" />
      <div className="switch__text on">{textOn}</div>
      <div className="switch__text off">{textOff}</div>
      <div className="switch__background" />
    </div>
  )
}
