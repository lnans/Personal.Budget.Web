import './AccountTileNew.scss'

export interface AccounTileNewProps {
  onClick: () => void
}

export default function AccountTileNew(props: AccounTileNewProps) {
  return (
    <div className="account-tile-new" onClick={props.onClick}>
      <div className="account-tile-new__icon">
        <i className="bx bx-plus"></i>
      </div>
    </div>
  )
}
