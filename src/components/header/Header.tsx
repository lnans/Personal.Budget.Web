import { Box, Stack, Toolbar } from '@mui/material'
import { useOffSetTop } from 'hooks'

import * as Styled from './Styles'

export default function Header() {
  const isOffset = useOffSetTop(Styled.HEIGHT)

  return (
    <Styled.AppBar isOffset={isOffset}>
      <Toolbar sx={{ minHeight: '100% !important', px: 5 }}>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {/* TODO */}
        </Stack>
      </Toolbar>
    </Styled.AppBar>
  )
}
