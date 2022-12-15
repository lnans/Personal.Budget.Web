import { Box, List } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NavItemLink } from 'router'

import NavListRoot from './NavList'
import * as Styled from './Styles'

type NavBarSectionProps = {
  title: string
  routerItems: NavItemLink[]
}

export default function NavBarSection({ title, routerItems = [] }: NavBarSectionProps) {
  const { t } = useTranslation()
  return (
    <Box>
      <Styled.ListSubheader disableSticky disableGutters>
        {t(title)}
      </Styled.ListSubheader>
      <List disablePadding sx={{ p: 1 }}>
        {routerItems.map((item) => (
          <NavListRoot key={item.title} item={item} isCollapse={false} />
        ))}
      </List>
    </Box>
  )
}
