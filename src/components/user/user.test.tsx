import { useAuth0 } from '@auth0/auth0-react'
import { render, screen } from 'utils/test-utils'
import { Mock } from 'vitest'

import User from './user'

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
    render(<User />)

    // Assert
    expect(screen.getByText('JW')).toBeInTheDocument()
  })
})
