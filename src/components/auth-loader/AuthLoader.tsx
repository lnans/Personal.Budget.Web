import { useAuth0 } from '@auth0/auth0-react'
import { Box, LinearProgress, linearProgressClasses, styled, Typography } from '@mui/material'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#3634c5' : '#3634c5',
  },
}))

type AuthLoaderProps = {
  children: React.ReactNode
}

function AuthLoader({ children }: AuthLoaderProps) {
  const { isAuthenticated, isLoading, error, loginWithRedirect } = useAuth0()

  const Loader = ({ message }: { message: string }) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '100vw', minHeight: '100vh' }}>
        <img src="/logo.png" alt="logo" width={300} />
        <BorderLinearProgress sx={{ width: 260 }} />
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          <i>{message}</i>
        </Typography>
      </Box>
    )
  }

  if (error) {
    return <Loader message={error.message} />
  }

  if (isLoading) {
    return <Loader message="Loading ..." />
  }

  if (!isAuthenticated) {
    loginWithRedirect()
    return <Loader message="SignIn ..." />
  }

  return <>{children}</>
}

export default AuthLoader
