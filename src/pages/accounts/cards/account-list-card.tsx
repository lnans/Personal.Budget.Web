import { Card, Group, LoadingOverlay, Stack, Text, Title, createStyles } from '@mantine/core'
import { AccountFacet } from 'api/contracts'
import { AccountTypeEnum } from 'api/enums'
import { useGetAccountsFacets } from 'api/hooks'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { getNumberColor, getNumberWithSpaces } from 'utils'

const useStyles = createStyles((theme) => ({
  account: {
    paddingBlock: theme.spacing.xs,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.gray[8],
    },
  },
  inactive: {
    borderLeftStyle: 'solid',
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  active: {
    borderLeftStyle: 'solid',
    borderLeftWidth: 3,
    borderLeftColor:
      theme.colorScheme === 'light' ? theme.colors.indigo[6] : theme.colors.indigo[4],
    backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[1] : theme.colors.gray[8],
  },
  bank: {
    color: theme.colorScheme === 'light' ? theme.colors.indigo[6] : theme.colors.indigo[4],
  },
}))

type AccountListCardProps = {
  title: string
  type: AccountTypeEnum
  selected?: AccountFacet
  onSelect?: (account: AccountFacet) => void
}

function AccountListCard({ title, type, selected, onSelect }: AccountListCardProps) {
  const { data: accounts, isFetching } = useGetAccountsFacets()
  const { t } = useTranslation()

  const handleSelectAccount = useCallback(
    (account: AccountFacet) => {
      onSelect && onSelect(account)
    },
    [onSelect]
  )

  const { classes, cx } = useStyles()

  return (
    <Card>
      <Card.Section>
        <Title order={6}>{title}</Title>
      </Card.Section>
      <LoadingOverlay visible={isFetching} />
      {accounts
        ?.filter((account) => account.type === type)
        .map((account) => (
          <Card.Section
            key={account.key}
            className={cx(
              classes.account,
              selected?.key === account.key ? classes.active : classes.inactive
            )}
            aria-selected={selected?.key === account.key}
            withBorder={!account.id}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => handleSelectAccount(account)}
          >
            <Group position="apart">
              <Stack spacing={0}>
                <Text
                  td={account.isArchived ? 'line-through' : undefined}
                  color={account.isArchived ? 'dimmed' : undefined}
                >
                  {t(account.name)}
                </Text>
                <Text className={classes.bank} size="xs" fw={500}>
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

export default AccountListCard
