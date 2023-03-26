import { CircularProgress, TableCell, TableRow, Typography, useTheme } from '@mui/material'
import { GetAccountsResponse, PaginatedList } from 'api/models'
import { EmptyContent, Label } from 'components'
import { useTranslation } from 'react-i18next'
import { numberWithSpaces } from 'utils'

import AccountsMoreMenu from './AccountsMoreMenu'

type AccountsRowsProps = {
  accounts: PaginatedList<GetAccountsResponse> | undefined
  loading?: boolean
  onDelete: (account: GetAccountsResponse) => void
}

function AccountsRows({ accounts, loading, onDelete }: AccountsRowsProps) {
  const theme = useTheme()
  const { t } = useTranslation()

  if (loading) {
    return (
      <TableRow>
        <TableCell colSpan={4} align="center">
          <CircularProgress></CircularProgress>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <>
      {accounts && accounts.items.length ? (
        accounts.items.map((account) => (
          <TableRow key={account.id}>
            <TableCell>
              <Typography variant="subtitle2" noWrap>
                {account.name}
              </Typography>
            </TableCell>
            <TableCell>{account.bank}</TableCell>
            <TableCell>{t(`enum.account_type.${account.type}`)}</TableCell>
            <TableCell>
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={(account.balance < 0 && 'error') || (account.balance === 0 && 'warning') || 'success'}
                sx={{ fontSize: 15 }}
              >
                {numberWithSpaces(account.balance)} €
              </Label>
            </TableCell>
            <TableCell align="right">
              <AccountsMoreMenu accountIsArchived={account.archived} onArchive={() => {}} onActivate={() => {}} onDelete={() => onDelete(account)} onEdit={() => {}} />
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableCell colSpan={4}>
          <EmptyContent title={t('common.no_data')} height={160} />
        </TableCell>
      )}
    </>
  )
}

export default AccountsRows
