import { useAuth0 } from '@auth0/auth0-react'
import { Box, Card, Container, Divider, Tab, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Tabs, Typography } from '@mui/material'
import { useGetAccounts } from 'api/hooks'
import { GetAccountsRequest } from 'api/models'
import { useTabs } from 'hooks'
import { SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AccountsFilters from './sections/AccountsFilters'
import AccountsRows from './sections/AccountsRows'

const STATUS_OPTIONS = ['Actifs', 'Archivés']

function Accounts() {
  const [filters, setFilters] = useState<GetAccountsRequest>({ archived: false, page: 0, pageSize: 50 })

  const auth = useAuth0()
  const { data, isLoading, isFetching } = useGetAccounts(auth, filters)
  const { currentTab, onChangeTab } = useTabs(STATUS_OPTIONS[0])

  const handleFilterStatus = (event: SyntheticEvent, newValue: string) => {
    onChangeTab(event, newValue)
    setFilters((prev) => ({ ...prev, archived: newValue === STATUS_OPTIONS[1] }))
  }

  const handleFilterSearch = (filterSearch: string) => {
    setFilters((prev) => ({ ...prev, search: filterSearch, page: 0 }))
  }

  const handlePageSize = (pageSize: number) => {
    setFilters((prev) => ({ ...prev, pageSize }))
  }

  const handlePage = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }

  const { t } = useTranslation()
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t('nav.links.accounts')}
      </Typography>
      <Card>
        <Tabs allowScrollButtonsMobile variant="scrollable" scrollButtons="auto" value={currentTab} onChange={handleFilterStatus} sx={{ px: 2, bgcolor: 'background.neutral' }}>
          {STATUS_OPTIONS.map((tab) => (
            <Tab disableRipple key={tab} label={tab} value={tab} />
          ))}
        </Tabs>

        <Divider />

        <AccountsFilters filterSearch={filters.search ?? ''} onFilterSearch={handleFilterSearch} />

        <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ minWidth: 450, position: 'relative' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t('account.name')}</TableCell>
                  <TableCell>{t('account.bank')}</TableCell>
                  <TableCell>{t('account.type')}</TableCell>
                  <TableCell colSpan={2}>{t('account.balance')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <AccountsRows accounts={data} loading={isLoading || isFetching} />
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    count={data?.totalElements ?? 0}
                    rowsPerPage={filters.pageSize}
                    page={filters.page}
                    onPageChange={(e, page) => handlePage(page)}
                    onRowsPerPageChange={(e) => handlePageSize(+e.target.value)}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </Container>
  )
}

export default Accounts
