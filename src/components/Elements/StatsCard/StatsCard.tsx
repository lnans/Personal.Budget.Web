import { Paper, Skeleton, Text, Title } from '@mantine/core'

import { getNumberColor, getNumberWithSpaces } from '@/utils'

type StatsCard = {
  title: string
  subtitle: string
  amount?: number
  isLoading?: boolean
}

export function StatsCard({ title, subtitle, amount, isLoading }: StatsCard) {
  if (amount === undefined || isLoading) {
    return <Skeleton height={125} width={220} />
  }

  return (
    <Paper withBorder p="md" radius="md" miw={220} role="contentinfo">
      <Text fw={700} tt="uppercase" size="xs" color="dimmed">
        {title}
      </Text>

      <Title order={3} mt="md" color={getNumberColor(amount)}>
        {getNumberWithSpaces(amount)} €
      </Title>

      <Text fz="xs" c="dimmed" mt={7}>
        {subtitle}
      </Text>
    </Paper>
  )
}
