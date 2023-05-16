import { Box, createStyles } from '@mantine/core'
import { AppNav } from 'components'
import { useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ROUTER_LINKS } from 'router'

const useStyles = createStyles((theme) => ({
  main: {
    maxHeight: 'calc(100vh - 64px)',
    paddingTop: theme.spacing.xl,
    overflow: 'auto',
  },
}))

function MainLayout() {
  const { pathname } = useLocation()
  const links = useMemo(() => [ROUTER_LINKS.accounts, ROUTER_LINKS.settings], [])

  const { classes } = useStyles()
  return (
    <>
      <AppNav current={pathname} links={links} />
      <Box className={classes.main}>
        <Outlet />
      </Box>
    </>
  )
}

export default MainLayout
