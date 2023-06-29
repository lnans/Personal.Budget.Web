import { Tabs } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { AccountSearchParams, AccountTypeEnum } from '@/types'

import { OperationsList } from './OperationsList'

export function Operations() {
  const [searchParams] = useSearchParams()
  const [accountFilter, setAccountFilter] = useState<AccountSearchParams>({ id: null, type: null })
  const { t } = useTranslation()

  // retrieve account filter from query param in react router
  useEffect(() => {
    setAccountFilter({
      id: searchParams.get('id'),
      type: searchParams.get('type') as AccountTypeEnum,
    })
  }, [searchParams])

  return (
    <Tabs keepMounted={false} defaultValue="operations-actual">
      <Tabs.List mb="md">
        <Tabs.Tab value="operations-actual">{t('operations.tab.actual')}</Tabs.Tab>
        <Tabs.Tab value="operations-pending">{t('operations.tab.pending')}</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="operations-actual" pt="xs">
        <OperationsList accountFilter={accountFilter} />
      </Tabs.Panel>

      <Tabs.Panel value="operations-pending" pt="xs">
        <OperationsList accountFilter={accountFilter} pending />
      </Tabs.Panel>
    </Tabs>
  )
}
