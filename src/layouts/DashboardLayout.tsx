import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Header, NavBar } from 'components'
import { Outlet } from 'react-router-dom'

const MainStyled = styled('main')(({ theme }) => ({
  flexGrow: 1,

  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 92 + 24,
  paddingBottom: 92 + 24,
  width: `calc(100% - ${280}px)`,
  transition: theme.transitions.create('margin-left', {
    duration: theme.transitions.duration.shorter,
  }),
}))

function DashboardLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: 1 }}>
      <Header />
      <NavBar />
      <MainStyled>
        <Outlet />
      </MainStyled>
    </Box>
  )
}

export default DashboardLayout
