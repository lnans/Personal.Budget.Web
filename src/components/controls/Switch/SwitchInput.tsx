import clsx from 'clsx'
import { ChangeEvent, useState } from 'react'
import './SwitchInput.scss'

export interface SwitchInputProps {
  textOn: string
  textOff: string
  highlight?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

export default function SwitchInput(props: SwitchInputProps) {
  const { textOn, textOff, highlight, defaultChecked, onChange } = props
  const [value, setValue] = useState<boolean>(defaultChecked ?? false)

  const onSwitchChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked)
    onChange && onChange(e.target.checked)
  }

  const classes = clsx({
    switch: true,
    highlight: highlight,
  })

  return (
    <div className={classes}>
      <input className="switch__input" type="checkbox" checked={value} onChange={onSwitchChangeInput} />
      <div className="switch__circle" />
      <div className="switch__text on">{textOn}</div>
      <div className="switch__text off">{textOff}</div>
      <div className="switch__background" />
    </div>
  )
}
