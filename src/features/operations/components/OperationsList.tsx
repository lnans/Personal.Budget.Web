import { Icon } from '@iconify/react/dist/iconify.js'
import { Group, MultiSelect, Paper, TextInput } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { useGetTags } from '@/features/tags'
import { AccountSearchParams, OperationTypeEnum } from '@/types'
import { getSelectItemsfromEnum } from '@/utils'

type OperationsListProps = {
  accountFilter: AccountSearchParams
  pending?: boolean
}

export function OperationsList({ accountFilter }: OperationsListProps) {
  const { data: tags, isLoading: isLoadingTags } = useGetTags()

  const { t } = useTranslation()

  return (
    <Paper p="md" withBorder mih={600}>
      <Group>
        <TextInput placeholder="Rechercher..." icon={<Icon icon="material-symbols:search" />} />
        <MultiSelect placeholder="Type" data={getSelectItemsfromEnum(OperationTypeEnum, 'enums.operation_type', t)} clearable />
        <MultiSelect
          placeholder="Tags"
          data={tags?.map((tag) => ({ value: tag.id, label: tag.name })) ?? []}
          clearable
          disabled={isLoadingTags}
        />
      </Group>
      {JSON.stringify(accountFilter)}
      {JSON.stringify(tags)}
    </Paper>
  )
}
