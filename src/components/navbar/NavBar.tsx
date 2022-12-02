import { useAuth0 } from '@auth0/auth0-react'
import { Avatar, Box, Drawer, Link, Typography } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import { Logo } from 'components'
import { routes } from 'router'

import NavBarSection from './NavBarSection'

const NAV_WIDTH = 280

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}))

function NavBar() {
  const { user } = useAuth0()

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      <Drawer
        open
        variant="permanent"
        PaperProps={{
          sx: {
            width: NAV_WIDTH,
            bgcolor: 'background.default',
            borderRightStyle: 'dashed',
          },
        }}
      >
        <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
          <Logo />
        </Box>
        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline="none">
            <StyledAccount>
              <Avatar src={user?.picture} alt="photoURL" />

              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {user?.name}
                </Typography>
              </Box>
            </StyledAccount>
          </Link>
        </Box>
        <NavBarSection links={routes} />
        <Box sx={{ flexGrow: 1 }} />
      </Drawer>
    </Box>
  )
}

export default NavBar
