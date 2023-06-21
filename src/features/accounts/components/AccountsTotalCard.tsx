import { Card, Skeleton, Stack, Text, Title, createStyles } from '@mantine/core'
import { useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { getNumberColor, getNumberWithSpaces } from '@/utils'

import { useGetAccountsFacets } from '../api/getAccountsFacets'

const useStyles = createStyles((theme) => ({
  card: {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.gray[8],
    },
  },
}))

type TotalHoldingsCardProps = {
  onSelect: VoidFunction
}

export function AccountsTotalCard({ onSelect }: TotalHoldingsCardProps) {
  const { t } = useTranslation()
  const { classes } = useStyles()

  const ref = useRef<HTMLDivElement>(null)

  const { data: accounts, isFetching } = useGetAccountsFacets()

  const amount = useMemo(() => {
    return accounts?.filter((account) => !!account.id).reduce((acc, curr) => acc + curr.balance, 0)
  }, [accounts])

  if (isFetching) {
    return <Skeleton height={100} />
  }

  return (
    <Card className={classes.card} ref={ref} onClick={onSelect}>
      <Stack align="center" spacing={0}>
        <Text color="dimmed" size="xs" fw="bold">
          {t('accounts.total')}
        </Text>
        <Title order={2} color={getNumberColor(amount)}>
          {getNumberWithSpaces(amount)} €
        </Title>
      </Stack>
    </Card>
  )
}
