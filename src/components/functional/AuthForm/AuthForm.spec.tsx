import { authenticationRoutes } from '@api/endpoints/authEndPoints'
import { SignInResponse } from '@models/auth/signInResponse'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { QueryClientProvider } from 'react-query'
import { queryClientForTest } from '../../../setupTest'
import AuthForm from './AuthForm'

describe('● Render', () => {
  test('default', () => {
    const onLogged = jest.fn()
    render(
      <QueryClientProvider client={queryClientForTest}>
        <AuthForm onLogged={onLogged} />
      </QueryClientProvider>
    )

    const form = screen.queryByTestId('auth-form')

    expect(form).toBeTruthy()
    expect(form).toBeInTheDocument()
  })
})

describe('● When form', () => {
  afterEach(() => jest.clearAllMocks())

  test('valid should call auth service and onLogged function', async () => {
    const onLogged = jest.fn()
    const signInRequest = { username: 'test', password: 'test' }
    const signInResponse: SignInResponse = {}
    const signIn = jest.spyOn(authenticationRoutes, 'signIn').mockImplementation(() => Promise.resolve(signInResponse))
    render(
      <QueryClientProvider client={queryClientForTest}>
        <AuthForm onLogged={onLogged} />
      </QueryClientProvider>
    )

    const username = screen.getByLabelText('components.auth_form.username')
    const password = screen.getByLabelText('components.auth_form.password')
    const button = screen.getByRole('button')

    await act(async () => {
      fireEvent.change(username, { target: { value: 'test' } })
      fireEvent.change(password, { target: { value: 'test' } })
      fireEvent.click(button)
    })

    expect(signIn).toHaveBeenCalledWith(signInRequest)
    expect(onLogged).toHaveBeenCalledTimes(1)
  })

  test('invalid should not call auth service and onLogged function', async () => {
    const onLogged = jest.fn()
    const signInResponse: SignInResponse = {}
    const signIn = jest.spyOn(authenticationRoutes, 'signIn').mockImplementation(() => Promise.resolve(signInResponse))
    render(
      <QueryClientProvider client={queryClientForTest}>
        <AuthForm onLogged={onLogged} />
      </QueryClientProvider>
    )

    const button = screen.getByRole('button')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(signIn).toHaveBeenCalledTimes(0)
    expect(onLogged).toHaveBeenCalledTimes(0)
  })
})
