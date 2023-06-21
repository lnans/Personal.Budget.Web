import { useAuth0 } from '@auth0/auth0-react'
import { Mock, vi } from 'vitest'

import { render, screen } from '@/test/test-utils'

import { AppLoader } from './AppLoader'

describe('AppLoader', () => {
  it('when user is not authenticated and auth0 is loading, should display loader and not call loginWithRedirect, ', () => {
    // Arrange
    const loginWithRedirectMock = vi.fn()
    const useAuth0Mock = useAuth0 as Mock

    useAuth0Mock.mockReturnValue({
      isLoading: true,
      isAuthenticated: false,
      error: undefined,
      loginWithRedirect: loginWithRedirectMock,
    })

    // Act
    render(
      <AppLoader>
        <div>app-content</div>
      </AppLoader>
    )

    // Assert
    expect(loginWithRedirectMock).not.toHaveBeenCalled()
    expect(screen.queryByText('app-content')).not.toBeInTheDocument()
  })

  it('when user is not authenticated, should display loader and call loginWithRedirect', () => {
    // Arrange
    const loginWithRedirectMock = vi.fn()
    const useAuth0Mock = useAuth0 as Mock

    useAuth0Mock.mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
      error: undefined,
      loginWithRedirect: loginWithRedirectMock,
    })

    // Act
    render(
      <AppLoader>
        <div>app-content</div>
      </AppLoader>
    )

    // Assert
    expect(loginWithRedirectMock).toHaveBeenCalled()
    expect(screen.queryByText('app-content')).not.toBeInTheDocument()
  })

  it('when user is authenticated, should display children and not call loginWithRedirect', () => {
    // Arrange
    const loginWithRedirectMock = vi.fn()
    const useAuth0Mock = useAuth0 as Mock

    useAuth0Mock.mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
      error: undefined,
      loginWithRedirect: loginWithRedirectMock,
    })

    // Act
    render(
      <AppLoader>
        <div>app-content</div>
      </AppLoader>
    )

    // Assert
    expect(loginWithRedirectMock).not.toHaveBeenCalled()
    expect(screen.getByText('app-content')).toBeInTheDocument()
  })
})
