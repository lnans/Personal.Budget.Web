import { Icon } from '@iconify/react/dist/iconify.js'
import { Group, MultiSelect, Paper, Tabs, TextInput } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { AccountSearchParams, AccountTypeEnum } from '@/types'
import { getSelectItemsfromEnum } from '@/utils'

export function Operations() {
  const [searchParams] = useSearchParams()
  const [accountFilter, setAccountFilter] = useState<AccountSearchParams>({})
  const { t } = useTranslation()

  // retrieve account filter from query param in react router
  useEffect(() => {
    setAccountFilter({
      id: searchParams.get('id'),
      type: searchParams.get('type') as AccountTypeEnum,
    })
  }, [searchParams])

  return (
    <Tabs defaultValue="gallery">
      <Tabs.List mb="md">
        <Tabs.Tab value="gallery">Opérations</Tabs.Tab>
        <Tabs.Tab value="messages">Opérations à venir</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs">
        <Paper p="md" withBorder mih={600}>
          <Group>
            <TextInput placeholder="Rechercher..." icon={<Icon icon="material-symbols:search" />} />
            <MultiSelect placeholder="Type" data={getSelectItemsfromEnum(AccountTypeEnum, '', t)} />
          </Group>
          {JSON.stringify(accountFilter)}
        </Paper>
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        Messages tab content
      </Tabs.Panel>
    </Tabs>
  )
}
