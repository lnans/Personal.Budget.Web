import { authenticationRoutes } from '@api/endpoints/authEndPoints'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { QueryClientProvider } from 'react-query'
import { queryClientForTest } from '../../../setupTest'
import AuthProvider from './AuthProvider'

function FakeAuthForm() {
  return <div data-testid="fake-auth-form" />
}
function FakeChildren() {
  return <div data-testid="fake-children" />
}

jest.mock('@components', () => ({
  AuthForm: FakeAuthForm,
}))

describe('Render:', () => {
  afterEach(() => jest.clearAllMocks())
  test('when user is not logged, should render authForm', async () => {
    const getAuthInfoRejected = jest.spyOn(authenticationRoutes, 'getAuthInfo').mockImplementation(() => () => Promise.reject())

    await act(async () => {
      render(
        <QueryClientProvider client={queryClientForTest}>
          <AuthProvider>
            <FakeChildren />
          </AuthProvider>
        </QueryClientProvider>
      )
    })

    const form = screen.queryByTestId('fake-auth-form')
    const children = screen.queryByTestId('fake-children')

    expect(getAuthInfoRejected).toHaveBeenCalledTimes(2) // call from render and react-query
    expect(form).toBeInTheDocument()
    expect(children).not.toBeInTheDocument()
  })

  test('when user is logged, should render childrens', async () => {
    const authResponse = { id: 'test', username: 'test' }
    const getAuthInfoRejected = jest.spyOn(authenticationRoutes, 'getAuthInfo').mockImplementation(() => () => Promise.resolve(authResponse))

    await act(async () => {
      render(
        <QueryClientProvider client={queryClientForTest}>
          <AuthProvider>
            <FakeChildren />
          </AuthProvider>
        </QueryClientProvider>
      )
    })

    const form = screen.queryByTestId('fake-auth-form')
    const children = screen.queryByTestId('fake-children')

    expect(getAuthInfoRejected).toHaveBeenCalledTimes(2) // call from render and react-query
    expect(form).not.toBeInTheDocument()
    expect(children).toBeInTheDocument()
  })
})
