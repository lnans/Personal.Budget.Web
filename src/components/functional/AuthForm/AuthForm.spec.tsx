import { render, screen } from '@testing-library/react'
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
