import { Icon } from '@iconify/react/dist/iconify.js'
import { CloseButton, Group, Paper, Table, TextInput } from '@mantine/core'

import { AccountSearchParams } from '@/types'

import { OperationsFilters } from './OperationsFilters'

type OperationsListProps = {
  accountFilter: AccountSearchParams
  pending?: boolean
}

export function OperationsList({ accountFilter }: OperationsListProps) {
  return (
    <Paper p="md" withBorder mih={600}>
      <Group>
        <OperationsFilters />
        <TextInput
          placeholder="Rechercher..."
          icon={<Icon icon="material-symbols:search" height={18} />}
          rightSection={<CloseButton />}
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
