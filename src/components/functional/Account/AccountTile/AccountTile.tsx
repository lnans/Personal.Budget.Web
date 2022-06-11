import { AccountDetailsResponse } from '@models/account/AccountDetailsResponse'
import clsx from 'clsx'
import './AccountTile.scss'

export interface AccountTileProps {
  account: AccountDetailsResponse
  isSelected?: boolean
  onClick?: (id: string) => void
  onEdit?: () => void
}

export default function AccountTile(props: AccountTileProps) {
  const { account, isSelected, onClick, onEdit } = props

  const handleClick = () => {
    !isSelected && onClick && onClick(account.id)
  }

  const handleEdit = () => {
    onEdit && onEdit()
  }

  const containerClasses = clsx({
    'account-tile': true,
    'account-tile--selected': isSelected,
  })

  const balanceClasses = clsx({
    'account-tile-balance': true,
    negative: account.balance < 0,
    zero: account.balance === 0,
    positive: account.balance > 0,
  })

  return (
    <div className={containerClasses} onClick={handleClick} data-testid="account-tile-container">
      <h4 className="account-tile-title">{account.name}</h4>
      <div className="account-tile-balance-container">
        <div className="account-tile-icon">
          <i className="bx bx-coin"></i>
        </div>
        <p className={balanceClasses} data-testid="account-tile-balance">
          {account.balance.toString().replace('.', ',')} €
        </p>
      </div>
      <div className="account-tile-info">
        <p>{account.bank}</p>
      </div>
      {isSelected && (
        <div className="account-edit" onClick={handleEdit}>
          <i className="bx bxs-edit"></i>
        </div>
      )}
    </div>
  )
}
