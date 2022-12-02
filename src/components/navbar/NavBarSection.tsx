import { Box, List } from '@mui/material'
import NavItem, { NavItemLink } from './NavItem'

type NavBarSectionProps = {
  links: NavItemLink[]
}

export default function NavBarSection({ links = [], ...other }: NavBarSectionProps) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {links.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  )
}
