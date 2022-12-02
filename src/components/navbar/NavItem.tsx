import { ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material'
import { SvgColor } from 'components'
import { NavLink as RouterLink } from 'react-router-dom'

const getIcon = (name: string) => <SvgColor src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />

const StyledNavItem = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  marginBottom: 4,
}))

const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export type NavItemLink = {
  title: string
  path: string
  icon: string
}

type NavItemProps = {
  item: NavItemLink
}

export default function NavItem({ item }: NavItemProps) {
  const { title, path, icon } = item

  return (
    <StyledNavItem
      disableGutters
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && getIcon(icon)}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />
    </StyledNavItem>
  )
}
