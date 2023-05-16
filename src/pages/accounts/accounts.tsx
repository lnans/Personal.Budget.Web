import { Container, Stack, createStyles } from '@mantine/core'
import { AccountFacet } from 'api/contracts'
import { AccountTypeEnum } from 'api/enums'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import AccountListCard from './cards/account-list-card'
import OperationsCard from './cards/operations-card'
import TotalHoldingsCard from './cards/total-holdings-card'

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    gap: theme.spacing.md,
  },
  main: {
    flexGrow: 1,
  },
}))

function Accounts() {
  const [selected, setSelected] = useState<AccountFacet>()
  const { t } = useTranslation()

  const resetSelected = useCallback(() => setSelected(undefined), [])

  const { classes } = useStyles()
  return (
    <Container className={classes.root} size="xl">
      <Stack miw={350}>
        <TotalHoldingsCard onSelect={resetSelected} />
        <AccountListCard
          title={t('account_list_card.expenses')}
          type={AccountTypeEnum.Expenses}
          selected={selected}
          onSelect={setSelected}
        />
        <AccountListCard
          title={t('account_list_card.savings')}
          type={AccountTypeEnum.Savings}
          selected={selected}
          onSelect={setSelected}
        />
      </Stack>
      <Stack className={classes.main}>
        <OperationsCard />
      </Stack>
    </Container>
  )
}

export default Accounts
