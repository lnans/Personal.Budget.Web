import { Group, Skeleton, Stack, Text } from '@mantine/core'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

import { StatsCard } from '@/components/Elements'

import { useGetAccountSummary } from '../api/getAccountSummary'
import { AccountFacetDto, AccountSummaryDto } from '../types'

type AccountSummaryProps = {
  selected?: AccountFacetDto
}

export function AccountSummary({ selected }: AccountSummaryProps) {
  const { data, isFetching } = useGetAccountSummary({ filter: { id: selected?.id, type: selected?.type } })
  const { t } = useTranslation()

  return (
    <>
      <SummaryTitle account={data} isLoading={isFetching} />
      <Group>
        <StatsCard
          title={t('account.summary.balance.title')}
          subtitle={t('account.summary.balance.subtitle', { lastOperation: dayjs(data?.lastOperation).format('DD MMMM YYYY') })}
          amount={data?.balance}
          isLoading={isFetching}
        />
        <StatsCard
          title={t('account.summary.pending.title')}
          subtitle={t('account.summary.pending.subtitle')}
          amount={data?.upcoming}
          isLoading={isFetching}
        />
      </Group>
    </>
  )
}

// -- sub compenents

function SummaryTitle({ account, isLoading }: { account?: AccountSummaryDto; isLoading: boolean }) {
  const { t } = useTranslation()

  if (!account || isLoading) {
    return (
      <Stack spacing={0}>
        <Skeleton height={24} width={250} my={4} />
        <Skeleton height={20} width={300} my={2} />
      </Stack>
    )
  }

  return (
    <Stack spacing={0}>
      <Text fw={500} size="xl">
        {t(account.name)}
      </Text>
      <Text color="dimmed" tt="uppercase">
        {account?.bank}
      </Text>
    </Stack>
  )
}
