import { CircularProgress, TableCell, TableRow, Typography, useTheme } from '@mui/material'
import { GetAccountsResponse, PaginatedList } from 'api/models'
import { EmptyContent, Label } from 'components'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { numberWithSpaces } from 'utils'
import AccountsMoreMenu from './AccountsMoreMenu'

type AccountsRowsProps = {
  accounts: PaginatedList<GetAccountsResponse> | undefined
  loading?: boolean
}

function AccountsRows({ accounts, loading }: AccountsRowsProps) {
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <>
      {loading ? (
        <TableRow>
          <TableCell colSpan={4} align="center">
            <CircularProgress></CircularProgress>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow hover={!!accounts && !!accounts.items.length}>
          {accounts && accounts.items.length ? (
            accounts.items.map((account) => (
              <Fragment key={account.id}>
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
                  <AccountsMoreMenu accountIsArchived={account.archived} onArchive={() => {}} onActivate={() => {}} onDelete={() => {}} onEdit={() => {}} />
                </TableCell>
              </Fragment>
            ))
          ) : (
            <TableCell colSpan={4}>
              <EmptyContent title={t('common.no_data')} height={160} />
            </TableCell>
          )}
        </TableRow>
      )}
    </>
  )
}

export default AccountsRows
