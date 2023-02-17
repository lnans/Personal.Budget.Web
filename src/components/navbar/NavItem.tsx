import { Box, ListItemText } from '@mui/material'
import { Iconify, SvgColor } from 'components'
import { useTranslation } from 'react-i18next'
import { NavLink as RouterLink } from 'react-router-dom'
import { NavItemLink } from './NavBar'

import * as Styled from './Styles'

const getIcon = (name: string) => <SvgColor src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />

type ArrowIconProps = {
  open: boolean
}

function ArrowIcon({ open }: ArrowIconProps) {
  return <Iconify icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'} sx={{ width: 16, height: 16, ml: 1 }} />
}

type DotIconProps = {
  active: boolean
}

function DotIcon({ active }: DotIconProps) {
  return (
    <Styled.ListItemIcon>
      <Box
        component="span"
        sx={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'text.disabled',
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: 'scale(2)',
            bgcolor: 'primary.main',
          }),
        }}
      />
    </Styled.ListItemIcon>
  )
}

type NavItemProps = {
  item: NavItemLink
  isCollapse?: boolean
  open?: boolean
  active: boolean
  onOpen?: () => void
}

export function NavItemRoot({ item, isCollapse, open = false, active, onOpen }: NavItemProps) {
  const { title, path, icon, children } = item
  const { t } = useTranslation()

  const renderContent = (
    <>
      {icon && <Styled.ListItemIcon>{getIcon(icon)}</Styled.ListItemIcon>}
      <Styled.ListItemText disableTypography primary={t(title)} isCollapse={isCollapse} />
      {!isCollapse && <>{children && <ArrowIcon open={open} />}</>}
    </>
  )

  if (children) {
    return (
      <Styled.ListItemButton onClick={onOpen} activeRoot={active}>
        {renderContent}
      </Styled.ListItemButton>
    )
  }

  return (
    <Styled.ListItemButton component={RouterLink} to={path} activeRoot={active}>
      {renderContent}
    </Styled.ListItemButton>
  )
}

export function NavItemSub({ item, open = false, active = false, onOpen }: NavItemProps) {
  const { title, path, children } = item
  const { t } = useTranslation()

  const renderContent = (
    <>
      <DotIcon active={active} />
      <ListItemText disableTypography primary={t(title)} />
      {children && <ArrowIcon open={open} />}
    </>
  )

  if (children) {
    return (
      <Styled.ListItemButton onClick={onOpen} activeSub={active} subItem>
        {renderContent}
      </Styled.ListItemButton>
    )
  }

  return (
    <Styled.ListItemButton component={RouterLink} to={path} activeSub={active} subItem>
      {renderContent}
    </Styled.ListItemButton>
  )
}
