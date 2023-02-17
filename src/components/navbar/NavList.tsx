import { Collapse, List } from '@mui/material'
import { useState } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import { NavItemLink } from './NavBar'
import { NavItemRoot, NavItemSub } from './NavItem'

const getActive = (path: string, pathname: string) => (path ? !!matchPath({ path, end: false }, pathname) : false)

type NavListRootProps = {
  isCollapse: boolean
  item: NavItemLink
}

export default function NavListRoot({ isCollapse, item }: NavListRootProps) {
  const { pathname } = useLocation()
  const active = getActive(item.path, pathname)
  const [open, setOpen] = useState(active)
  const hasChildren = !!item.children

  if (hasChildren) {
    return (
      <>
        <NavItemRoot item={item} isCollapse={isCollapse} active={active} open={open} onOpen={() => setOpen(!open)} />

        {!isCollapse && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {(item.children || []).map((item, index) => (
                <NavListSub key={`${item.title}-${index}`} item={item} />
              ))}
            </List>
          </Collapse>
        )}
      </>
    )
  }

  return <NavItemRoot item={item} active={active} isCollapse={isCollapse} />
}

type NavListSub = {
  item: NavItemLink
}

function NavListSub({ item }: NavListSub) {
  const { pathname } = useLocation()
  const active = getActive(item.path, pathname)
  const [open, setOpen] = useState(active)
  const hasChildren = !!item.children

  if (hasChildren) {
    return (
      <>
        <NavItemSub item={item} onOpen={() => setOpen(!open)} open={open} active={active} />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 3 }}>
            {(item.children || []).map((item) => (
              <NavItemSub key={item.title} item={item} active={getActive(item.path, pathname)} />
            ))}
          </List>
        </Collapse>
      </>
    )
  }

  return <NavItemSub item={item} active={active} />
}
