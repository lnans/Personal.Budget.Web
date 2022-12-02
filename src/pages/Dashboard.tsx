import { Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
      <p>Dashboard</p>
      <Button to="/hey" size="large" variant="contained" component={RouterLink}>
        Go to 404
      </Button>
    </div>
  )
}

export default Dashboard
