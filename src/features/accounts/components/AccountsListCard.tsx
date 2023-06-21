import { Card, Group, Skeleton, Stack, Text, Title, createStyles } from '@mantine/core'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { AccountTypeEnum } from '@/types'
import { getNumberColor, getNumberWithSpaces } from '@/utils'

import { useGetAccountsFacets } from '../api/getAccountsFacets'
import { AccountFacetDto } from '../types'

const useStyles = createStyles((theme) => ({
  account: {
    paddingBlock: theme.spacing.xs,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.dark[5],
    },
    borderLeftStyle: 'solid',
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  active: {
    borderLeftColor: theme.colorScheme === 'light' ? theme.colors.indigo[6] : theme.colors.indigo[4],
    backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.dark[5],
  },
  bank: {
    color: theme.colorScheme === 'light' ? theme.colors.indigo[6] : theme.colors.indigo[4],
  },
}))

type AccountListCardProps = {
  title: string
  type: AccountTypeEnum
  selected?: AccountFacetDto
  onSelect?: (account: AccountFacetDto) => void
}

export function AccountsListCard({ title, type, selected, onSelect }: AccountListCardProps) {
  const { data: accounts, isFetching } = useGetAccountsFacets()
  const { classes, cx } = useStyles()
  const { t } = useTranslation()

  const handleSelectAccount = useCallback(
    (account: AccountFacetDto) => {
      onSelect && onSelect(account)
    },
    [onSelect]
  )

  if (isFetching) {
    return <Skeleton height={300} />
  }

  return (
    <Card>
      <Card.Section>
        <Text size="lg" fw={500}>
          {title}
        </Text>
        <Text color="dimmed" size="xs">
          {t('accounts.list.tip')}
        </Text>
      </Card.Section>
      {accounts
        ?.filter((account) => account.type === type)
        .map((account) => (
          <Card.Section
            key={account.key}
            className={cx(classes.account, { [classes.active]: selected?.key === account.key })}
            aria-selected={selected?.key === account.key}
            onClick={() => handleSelectAccount(account)}
          >
            <Group position="apart">
              <Stack spacing={0}>
                <Text td={account.isArchived ? 'line-through' : undefined} color={account.isArchived ? 'dimmed' : undefined}>
                  {t(account.name)}
                </Text>
                <Text color="dimmed" size="xs" tt="uppercase">
                  {account.bank}
                </Text>
              </Stack>
              <Title order={6} color={getNumberColor(account.balance)}>
                {getNumberWithSpaces(account.balance)} €
              </Title>
            </Group>
          </Card.Section>
        ))}
    </Card>
  )
}
