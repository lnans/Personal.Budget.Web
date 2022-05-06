import { AuthService } from '@services'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { createAxiosResponse } from '../../../setupTest'
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
    const getAuthInfoRejected = jest
      .spyOn(AuthService.prototype, 'getAuthInfo')
      .mockImplementation(() => Promise.reject())

    await act(async () => {
      render(
        <AuthProvider>
          <FakeChildren />
        </AuthProvider>
      )
    })

    const form = screen.queryByTestId('fake-auth-form')
    const children = screen.queryByTestId('fake-children')

    expect(getAuthInfoRejected).toHaveBeenCalledTimes(1)
    expect(form).toBeInTheDocument()
    expect(children).not.toBeInTheDocument()
  })

  test('when user is logged, should render childrens', async () => {
    const authResponse = { id: 'test', username: 'test' }
    const axiosResponse = createAxiosResponse(authResponse)
    const getAuthInfoRejected = jest
      .spyOn(AuthService.prototype, 'getAuthInfo')
      .mockImplementation(() => Promise.resolve(axiosResponse))

    await act(async () => {
      render(
        <AuthProvider>
          <FakeChildren />
        </AuthProvider>
      )
    })

    const form = screen.queryByTestId('fake-auth-form')
    const children = screen.queryByTestId('fake-children')

    expect(getAuthInfoRejected).toHaveBeenCalledTimes(1)
    expect(form).not.toBeInTheDocument()
    expect(children).toBeInTheDocument()
  })
})
