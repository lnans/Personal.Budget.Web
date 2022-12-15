import { useAuth0 } from '@auth0/auth0-react'
import { Avatar, Box, Drawer, Link, Typography } from '@mui/material'
import { Logo } from 'components'
import { routes } from 'router'

import NavBarSection from './NavBarSection'
import * as Styled from './Styles'

function NavBar() {
  const { user } = useAuth0()

  return (
    <Box component="nav" sx={{ width: Styled.NAVBAR.WIDTH }}>
      <Drawer
        open
        variant="permanent"
        PaperProps={{
          sx: {
            width: Styled.NAVBAR.WIDTH,
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
            <Styled.Account>
              <Avatar src={user?.picture} alt="photoURL" />

              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {user?.name}
                </Typography>
              </Box>
            </Styled.Account>
          </Link>
        </Box>
        <NavBarSection title={routes.subheader} routerItems={routes.items} />
        <Box sx={{ flexGrow: 1 }} />
      </Drawer>
    </Box>
  )
}

export default NavBar
