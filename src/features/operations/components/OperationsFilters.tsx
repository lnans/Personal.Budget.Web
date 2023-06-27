import { Icon } from '@iconify/react/dist/iconify.js'
import { Button, Indicator, Menu, MultiSelect, Stack, Title } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { useGetTags } from '@/features/tags'
import { OperationTypeEnum } from '@/types'
import { getSelectItemsfromEnum } from '@/utils'

export function OperationsFilters() {
  const { data: tags, isLoading: isLoadingTags } = useGetTags()

  const { t } = useTranslation()

  return (
    <Menu shadow="sm" width={350} keepMounted position="bottom-start">
      <Menu.Target>
        <Indicator label="3" size={19}>
          <Button variant="default" leftIcon={<Icon icon="material-symbols:filter-list-rounded" height={18} />}>
            Filtres
          </Button>
        </Indicator>
      </Menu.Target>

      <Menu.Dropdown p="lg">
        <Stack>
          <Title order={6}>Filtres</Title>
          <MultiSelect placeholder="Type" data={getSelectItemsfromEnum(OperationTypeEnum, 'enums.operation_type', t)} clearable />

          <MultiSelect
            placeholder="Tags"
            data={tags?.map((tag) => ({ value: tag.id, label: tag.name })) ?? []}
            clearable
            disabled={isLoadingTags}
          />
        </Stack>
      </Menu.Dropdown>
    </Menu>
  )
}
