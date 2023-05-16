import { Group, NavLink, createStyles, rem } from '@mantine/core'
import { AppLogo, ButtonThemeSwitch, User } from 'components'
import { useTranslation } from 'react-i18next'
import { NavLink as RouterLink } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  root: {
    height: 64,
    width: '100%',
    paddingInline: rem(32),
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.colorScheme === 'light' ? theme.colors.gray[3] : theme.colors.gray[8],
  },
}))

type AppNavLink = {
  label: string
  path: string
}

type AppNavProps = {
  current: string
  links: AppNavLink[]
}

function AppNav({ current, links }: AppNavProps) {
  const { t } = useTranslation()

  const { classes } = useStyles()

  return (
    <Group className={classes.root}>
      <AppLogo />
      <Group noWrap style={{ height: 'calc(100% + 1px)' }}>
        {links.map((link) => (
          <NavLink
            component={RouterLink}
            variant="subtle"
            key={link.path}
            label={t(link.label)}
            to={link.path}
            active={current.startsWith(link.path)}
            role="link"
          />
        ))}
      </Group>
      <div style={{ flexGrow: 1 }} />
      <ButtonThemeSwitch />
      <User />
    </Group>
  )
}

export default AppNav
