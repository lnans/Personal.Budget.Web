import { Card, LoadingOverlay, Stack, Title } from '@mantine/core'
import { useGetAccountsFacets } from 'api/hooks'
import { useRippleEffect } from 'hooks'
import { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { getNumberColor, getNumberWithSpaces } from 'utils'

type TotalHoldingsCardProps = {
  onSelect: VoidFunction
}

function TotalHoldingsCard({ onSelect }: TotalHoldingsCardProps) {
  const { t } = useTranslation()

  const ref = useRef<HTMLDivElement>(null)
  const ripples = useRippleEffect(ref)

  const { data: accounts, isFetching } = useGetAccountsFacets()

  const amount = useMemo(() => {
    return accounts?.filter((account) => !!account.id).reduce((acc, curr) => acc + curr.balance, 0)
  }, [accounts])

  return (
    <Card ref={ref} onClick={onSelect} style={{ cursor: 'pointer' }}>
      {ripples}
      <LoadingOverlay visible={isFetching} />
      <Stack align="center" spacing={0}>
        <Title order={6}>{t('total_holdings_card.title')}</Title>
        <Title order={2} color={getNumberColor(amount)}>
          {getNumberWithSpaces(amount)} €
        </Title>
      </Stack>
    </Card>
  )
}

export default TotalHoldingsCard
