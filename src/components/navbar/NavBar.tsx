import { useAuth0 } from '@auth0/auth0-react'
import { Avatar, Box, Drawer, Link, Typography } from '@mui/material'
import { Logo } from 'components'
import { PATH_ROUTES } from 'router'

import NavBarSection from './NavBarSection'
import * as Styled from './Styles'

export type NavItemLink = {
  title: string
  path: string
  children?: NavItemLink[]
  icon?: string
}

export type NavDefinition = {
  subheader: string
  items: NavItemLink[]
}

const NAV_ROUTES: NavDefinition = {
  subheader: 'nav.title',
  items: [
    PATH_ROUTES.dashboard,
    {
      ...PATH_ROUTES.finance,
      children: [PATH_ROUTES.finance.accounts, PATH_ROUTES.finance.operations],
    },
    PATH_ROUTES.settings,
  ],
}

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
        <NavBarSection title={NAV_ROUTES.subheader} routerItems={NAV_ROUTES.items} />
        <Box sx={{ flexGrow: 1 }} />
      </Drawer>
    </Box>
  )
}

export default NavBar
