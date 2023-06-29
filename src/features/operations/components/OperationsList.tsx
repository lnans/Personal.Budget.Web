import { Icon } from '@iconify/react/dist/iconify.js'
import { CloseButton, Group, Paper, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useCallback, useEffect, useState } from 'react'

import { AccountSearchParams } from '@/types'

import { UseGetOperations } from '../api/getOperations'
import { DEFAULT_QUERY, OperationsFilterDto, OperationsQueryDto } from '../types'

import { OperationsFilters } from './OperationsFilters'

type OperationsListProps = {
  accountFilter: AccountSearchParams
  pending?: boolean
}

export function OperationsList({ accountFilter, pending }: OperationsListProps) {
  const [operationsRequest, setOperationsRequest] = useState<OperationsQueryDto>({ ...DEFAULT_QUERY, pending })
  const [search, setSearch] = useState<string>('')
  const [debouncedSearch] = useDebouncedValue(search, 400)

  const { data } = UseGetOperations({ query: operationsRequest })

  useEffect(() => {
    setOperationsRequest((prev) => ({ ...prev, search: debouncedSearch }))
  }, [debouncedSearch])

  useEffect(() => {
    setOperationsRequest((prev) => ({ ...prev, accountId: accountFilter.id, accountType: accountFilter.type }))
  }, [accountFilter])

  const handleFilters = useCallback(
    (filters: OperationsFilterDto) => {
      setOperationsRequest((prev) => ({ ...filters, search: prev.search, pending }))
    },
    [pending]
  )

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
      {data && data.pages.flatMap((page) => page.data).map((op) => <div key={op.id}>{op.description}</div>)}
    </Paper>
  )
}
