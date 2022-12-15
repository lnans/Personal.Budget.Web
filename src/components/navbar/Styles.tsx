import {
  ListItemButton as MuiListItemButton,
  ListItemButtonProps as MuiListItemButtonProps,
  ListItemIcon as MuiListItemIcon,
  ListItemText as MuiListItemText,
  ListItemTextProps as MuiListItemTextProps,
  ListSubheader as MuiListSubheader,
} from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import { NavLinkProps } from 'react-router-dom'

const NAVBAR = {
  WIDTH: 280,
  ITEM_ROOT_HEIGHT: 48,
  ITEM_SUB_HEIGHT: 40,
  ICON_SIZE: 22,
}

const Account = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}))

const ListSubheader = styled(MuiListSubheader)(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
}))

type ListItemButtonProps = {
  activeRoot?: boolean
  activeSub?: boolean
  subItem?: boolean
  component?: React.ForwardRefExoticComponent<NavLinkProps & React.RefAttributes<HTMLAnchorElement>>
  to?: string
} & MuiListItemButtonProps

const ListItemButton = styled(MuiListItemButton, {
  shouldForwardProp: (prop) => prop !== 'activeRoot' && prop !== 'activeSub' && prop !== 'subItem',
})<ListItemButtonProps>(({ activeRoot, activeSub, subItem, theme }) => ({
  ...theme.typography.body2,
  position: 'relative',
  height: NAVBAR.ITEM_ROOT_HEIGHT,
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1.5),
  marginBottom: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  ...(activeRoot && {
    ...theme.typography.subtitle2,
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  }),
  ...(activeSub && {
    ...theme.typography.subtitle2,
    color: theme.palette.text.primary,
  }),
  ...(subItem && {
    height: NAVBAR.ITEM_SUB_HEIGHT,
  }),
}))

type ListItemTextProps = {
  isCollapse?: boolean
} & MuiListItemTextProps

const ListItemText = styled(MuiListItemText, {
  shouldForwardProp: (prop) => prop !== 'isCollapse',
})<ListItemTextProps>(({ isCollapse, theme }) => ({
  whiteSpace: 'nowrap',
  transition: theme.transitions.create(['width', 'opacity'], {
    duration: theme.transitions.duration.shorter,
  }),
  ...(isCollapse && {
    width: 0,
    opacity: 0,
  }),
}))

const ListItemIcon = styled(MuiListItemIcon)({
  width: NAVBAR.ICON_SIZE,
  height: NAVBAR.ICON_SIZE,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': { width: '100%', height: '100%' },
})

export { Account, ListSubheader, ListItemButton, ListItemText, ListItemIcon, NAVBAR }
