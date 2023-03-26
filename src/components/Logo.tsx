import { Box, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

function Logo() {
  const logo = <Box component="img" src="/logo.png" sx={{ height: 50, cursor: 'pointer' }} />

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  )
}

export default Logo
