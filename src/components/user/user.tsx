import { useAuth0 } from '@auth0/auth0-react'
import { Avatar } from '@mantine/core'
import { useMemo } from 'react'

function User() {
  const { user } = useAuth0()

  const initials = useMemo(() => {
    return user?.name
      ?.split(' ')
      .map((n) => n[0].toUpperCase())
      .slice(0, 2)
      .join('')
  }, [user])

  return (
    <Avatar radius="xl" color="indigo">
      {initials}
    </Avatar>
  )
}

export default User
