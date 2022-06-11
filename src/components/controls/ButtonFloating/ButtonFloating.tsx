import './ButtonFloating.scss'

export interface ButtonFloating {
  icon: string
  onClick?: () => void
}

export default function ButtonFloating(props: ButtonFloating) {
  const { icon, onClick } = props
  return (
    <button className="button-floating" onClick={onClick}>
      <i className={icon}></i>
    </button>
  )
}
