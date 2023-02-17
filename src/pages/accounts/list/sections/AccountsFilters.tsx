import { Button, InputAdornment, TextField, Toolbar } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Iconify } from 'components'
import { useDebounce } from 'hooks'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}))

type AccountsFiltersProps = {
  filterSearch: string
  onFilterSearch: (value: string) => void
}

export default function AccountsFilters({ filterSearch, onFilterSearch }: AccountsFiltersProps) {
  const { t } = useTranslation()

  const [search, setSearch] = useState(filterSearch)
  const debounceValue = useDebounce(search)

  useEffect(() => {
    onFilterSearch(debounceValue)
  }, [debounceValue])

  return (
    <RootStyle>
      <TextField
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder={t('account.search') ?? ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
      />

      {search && (
        <Button color="error" startIcon={<Iconify icon={'eva:trash-2-outline'} />} onClick={() => setSearch('')}>
          {t('action.delete')}
        </Button>
      )}
    </RootStyle>
  )
}
