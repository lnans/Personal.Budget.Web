import { Icon } from '@iconify/react/dist/iconify.js'
import { Button, Group, Indicator, Menu, MultiSelect, Stack, Title } from '@mantine/core'
import { DateInput, DatesProvider } from '@mantine/dates'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Tag } from '@/components/Elements'
import { useGetTags } from '@/features/tags'
import { OperationTypeEnum } from '@/types'
import { getSelectItemsfromEnum } from '@/utils'

import { DEFAULT_FILTERS, OperationsFilterDto } from '../types'

type OperationsFiltersProps = {
  onFilter?: (filters: OperationsFilterDto) => void
}

export function OperationsFilters({ onFilter }: OperationsFiltersProps) {
  const [count, setCount] = useState<number>(0)
  const [filters, setFilters] = useState<OperationsFilterDto>(DEFAULT_FILTERS)

  const { data: tags, isLoading: isLoadingTags } = useGetTags()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    let updateCount = 0
    updateCount += filters.types ? filters.types.length : 0
    updateCount += filters.tags ? filters.tags.length : 0
    updateCount += filters.start ? 1 : 0
    updateCount += filters.end ? 1 : 0

    setCount(updateCount)
    onFilter && onFilter(filters)
  }, [filters, onFilter])

  const handleReset = useCallback(() => setFilters(DEFAULT_FILTERS), [])

  return (
    <Menu shadow="sm" width={350} keepMounted position="bottom-start">
      <Menu.Target>
        <Indicator label={count} size={19} disabled={!count}>
          <Button variant="default" leftIcon={<Icon icon="material-symbols:filter-list-rounded" height={18} />}>
            {t('operations.filter.title')}
          </Button>
        </Indicator>
      </Menu.Target>

      <Menu.Dropdown p="lg">
        <Stack>
          <Group position="apart">
            <Title order={6} my={9}>
              {t('operations.filter.title')}
            </Title>
            {count && (
              <Button variant="light" color="red" size="xs" onClick={handleReset}>
                {t('operations.filter.clear')}
              </Button>
            )}
          </Group>

          <MultiSelect
            placeholder={t('operations.filter.types')}
            data={getSelectItemsfromEnum(OperationTypeEnum, 'enums.operation_type', t)}
            icon={<Icon icon="mdi:cog-transfer-outline" height={18} />}
            clearable
            value={filters.types}
            onChange={(types) => setFilters((prev) => ({ ...prev, types }))}
          />

          <MultiSelect
            placeholder={t('operations.filter.tags')}
            itemComponent={Tag}
            data={tags?.map((tag) => ({ value: tag.id, label: tag.name, color: tag.color })) ?? []}
            clearable
            searchable
            icon={<Icon icon="mdi:tag-text-outline" height={18} />}
            disabled={isLoadingTags}
            value={filters.tags}
            onChange={(tags) => setFilters((prev) => ({ ...prev, tags }))}
          />

          <DatesProvider settings={{ locale: i18n.language }}>
            <DateInput
              placeholder={t('operations.filter.since')}
              icon={<Icon icon="material-symbols:calendar-month-outline-rounded" height={18} />}
              clearable
              value={filters.start}
              onChange={(start) => setFilters((prev) => ({ ...prev, start }))}
            />
            <DateInput
              placeholder={t('operations.filter.until')}
              icon={<Icon icon="material-symbols:calendar-month-outline-rounded" height={18} />}
              clearable
              value={filters.end}
              onChange={(end) => setFilters((prev) => ({ ...prev, end }))}
            />
          </DatesProvider>
        </Stack>
      </Menu.Dropdown>
    </Menu>
  )
}
