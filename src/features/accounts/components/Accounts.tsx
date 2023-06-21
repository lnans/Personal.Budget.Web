import { Container, Stack, createStyles } from '@mantine/core'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useSearchParams } from 'react-router-dom'

import { AccountTypeEnum } from '@/types'

import { AccountFacetDto } from '../types'

import { AccountsListCard } from './AccountsListCard'
import { AccountsTotalCard } from './AccountsTotalCard'
import { AccountSummary } from './AccountSummary'

const useStyles = createStyles(() => ({
  root: {
    display: 'flex',
    gap: '2rem',
    maxWidth: 1920,
  },
}))

export function Accounts() {
  const [, setSearchParams] = useSearchParams()
  const [selected, setSelected] = useState<AccountFacetDto>()
  const { t } = useTranslation()

  const resetSelected = useCallback(() => setSelected(undefined), [])

  useEffect(() => {
    setSearchParams({
      ...(selected?.id && { id: selected?.id }),
      ...(selected?.type && { type: selected?.type }),
    })
  }, [selected, setSearchParams])

  const { classes } = useStyles()
  return (
    <Container className={classes.root} fluid>
      <Stack miw={350}>
        <AccountsTotalCard onSelect={resetSelected} />
        <AccountsListCard
          title={t('accounts.list.expenses')}
          type={AccountTypeEnum.Expenses}
          selected={selected}
          onSelect={setSelected}
        />
        <AccountsListCard
          title={t('accounts.list.savings')}
          type={AccountTypeEnum.Savings}
          selected={selected}
          onSelect={setSelected}
        />
      </Stack>
      <Stack style={{ flexGrow: 1 }}>
        <AccountSummary selected={selected} />
        <Outlet />
      </Stack>
    </Container>
  )
}
