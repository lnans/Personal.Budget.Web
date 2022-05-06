import { AuthService } from '@services'
import { act, fireEvent, render, screen } from '@testing-library/react'
import AuthForm from './AuthForm'

describe('● Render', () => {
  test('default', () => {
    const onLogged = jest.fn()
    render(<AuthForm onLogged={onLogged} />)

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
    const signIn = jest.spyOn(AuthService.prototype, 'signIn').mockImplementation(() => Promise.resolve())
    render(<AuthForm onLogged={onLogged} />)

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
    const signIn = jest.spyOn(AuthService.prototype, 'signIn').mockImplementation(() => Promise.resolve())
    render(<AuthForm onLogged={onLogged} />)

    const button = screen.getByRole('button')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(signIn).toHaveBeenCalledTimes(0)
    expect(onLogged).toHaveBeenCalledTimes(0)
  })
})
