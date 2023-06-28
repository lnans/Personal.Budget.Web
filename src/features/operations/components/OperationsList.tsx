import { Icon } from '@iconify/react/dist/iconify.js'
import { CloseButton, Group, Paper, Table, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useCallback, useEffect, useState } from 'react'

import { AccountSearchParams } from '@/types'

import { DEFAULT_FILTERS, OperationsFilterDto, OperationsRequestDto } from '../types'

import { OperationsFilters } from './OperationsFilters'

type OperationsListProps = {
  accountFilter: AccountSearchParams
  pending?: boolean
}

export function OperationsList({ accountFilter }: OperationsListProps) {
  const [operationsRequest, setOperationsRequest] = useState<OperationsRequestDto>({ ...DEFAULT_FILTERS, search: '' })
  const [search, setSearch] = useState<string>('')
  const [debouncedSearch] = useDebouncedValue(search, 400)

  useEffect(() => {
    setOperationsRequest((prev) => ({ ...prev, search: debouncedSearch }))
  }, [debouncedSearch])

  useEffect(() => {
    console.log(operationsRequest)
  }, [operationsRequest])

  const handleFilters = useCallback((filters: OperationsFilterDto) => {
    setOperationsRequest((prev) => ({ ...filters, search: prev.search }))
  }, [])

  const handleClearSearch = useCallback(() => {
    setSearch('')
  }, [])

  return (
    <Paper p="md" withBorder mih={600}>
      <Group>
        <OperationsFilters onFilter={handleFilters} />
        <TextInput
          placeholder="Rechercher..."
          icon={<Icon icon="material-symbols:search" height={18} />}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          rightSection={<CloseButton onClick={handleClearSearch} style={{ visibility: search ? 'visible' : 'hidden' }} />}
        />
      </Group>
      <Table highlightOnHover verticalSpacing="xs" mt="md">
        <tbody>
          <tr>
            <td>hey</td>
            <td>hey</td>
            <td>hey</td>
          </tr>
          <tr>
            <td>hey</td>
            <td>hey</td>
            <td>hey</td>
          </tr>
          <tr>
            <td colSpan={3}>hey</td>
          </tr>
          <tr>
            <td>hey</td>
            <td>hey</td>
            <td>hey</td>
          </tr>
        </tbody>
      </Table>
    </Paper>
  )
}
