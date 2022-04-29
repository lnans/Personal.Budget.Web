import { CSSProperties, useEffect, useState } from 'react'
import clsx from 'clsx'
import './button.scss'

export type ButtonColor = 'primary' | 'success' | 'error' | 'default'
export interface ButtonProps {
  children?: React.ReactNode
  color?: ButtonColor
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  style?: CSSProperties
  onClick?: () => void
}

export default function Button(props: ButtonProps) {
  const { color, disabled, loading, fullWidth, style } = props
  const [coords, setCoords] = useState({ x: -1, y: -1 })
  const [isRippling, setIsRippling] = useState(false)

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true)
      setTimeout(() => setIsRippling(false), 300)
    } else setIsRippling(false)
  }, [coords])

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 })
  }, [isRippling])

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })

    props.onClick && props.onClick()
  }

  const containerClasses = clsx({
    'button-container': !fullWidth,
    'button-container--fullWidth': fullWidth,
  })
  const buttonClasses = clsx({
    button: true,
    'button--loading': loading,
    [`button--${color}`]: true,
  })

  return (
    <div className={containerClasses} style={style}>
      <button className={buttonClasses} disabled={disabled || loading} onClick={handleClick}>
        {isRippling ? <span className="button__ripple-effect" style={{ left: coords.x, top: coords.y }} /> : ''}
        <div className="button__content">{props.children}</div>
        {props.loading && <div className="button__loader" />}
      </button>
    </div>
  )
}
