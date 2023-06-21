import { Box, createStyles } from '@mantine/core'
import { useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { AppNav } from '@/components/Elements'
import { NAVIGATION_LINKS } from '@/config'

const useStyles = createStyles((theme) => ({
  main: {
    height: 'calc(100vh - 64px)',
    maxHeight: 'calc(100vh - 64px)',
    paddingTop: theme.spacing.xl,
    overflow: 'auto',
    backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[0] : theme.colors.dark[9],
  },
}))

export function MainLayout() {
  const { pathname } = useLocation()
  const links = useMemo(() => [NAVIGATION_LINKS.accounts, NAVIGATION_LINKS.settings], [])

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
