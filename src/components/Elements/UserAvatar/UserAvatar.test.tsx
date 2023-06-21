import { useAuth0 } from '@auth0/auth0-react'
import { Mock } from 'vitest'

import { render, screen } from '@/test/test-utils'

import { UserAvatar } from './UserAvatar'

describe('User', () => {
  it('should render with user initials', () => {
    // Arrange
    const useAuth0Mock = useAuth0 as Mock

    useAuth0Mock.mockReturnValue({
      user: {
        name: 'John Wick',
      },
    })

    // Act
    render(<UserAvatar />)

    // Assert
    expect(screen.getByText('JW')).toBeInTheDocument()
  })
})
