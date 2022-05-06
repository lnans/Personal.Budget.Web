import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { UseFormRegister } from 'react-hook-form'
import TextField from './TextInput'

type TestRequest = { value: string }
const onChange = jest.fn()
const register: UseFormRegister<TestRequest> = () => ({
  ref: () => jest.fn(),
  onChange,
  onBlur: jest.fn(),
  name: 'value',
})

describe('● Render:', () => {
  test('default should render active', async () => {
    render(<TextField label="Field" defaultValue="Value" register={register} name="value" />)

    const input = await screen.findByRole('textbox')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
    expect(input).not.toBeDisabled()
  })

  test('loading should render disabled', async () => {
    render(<TextField label="Field" defaultValue="Value" register={register} name="value" loading />)

    const input = await screen.findByRole('textbox')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
    expect(input).toBeDisabled()
  })

  test('disabled should render disabled', async () => {
    render(<TextField label="Field" defaultValue="Value" register={register} name="value" disabled />)

    const input = await screen.findByRole('textbox')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
    expect(input).toBeDisabled()
  })

  test('with errors should render error label', async () => {
    render(<TextField label="Field" defaultValue="Value" register={register} name="value" error="error" />)

    const error = await screen.findByLabelText('error')

    expect(error).toBeTruthy()
    expect(error).toBeInTheDocument()
  })

  test('with icon should render span icon', async () => {
    render(<TextField label="Field" defaultValue="Value" register={register} name="value" icon="error" />)

    const input = await screen.findAllByTestId('input__icon')

    expect(input.length).toBe(1)
    expect(input[0]).toBeTruthy()
    expect(input[0]).toBeInTheDocument()
  })

  test('password should render with password type', async () => {
    render(<TextField label="Field" defaultValue="Value" register={register} name="value" type="password" />)

    const input = await screen.findByLabelText('Field')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
    expect(input.getAttribute('type')).toBe('password')
  })
})

describe('● When user type', () => {
  test('should trigger onChange', async () => {
    const { onChange } = register('value')
    render(<TextField label="Field" defaultValue="Value" register={register} name="value" />)
    const input = await screen.findByRole('textbox')

    act(() => {
      fireEvent.change(input, { target: { value: 'v' } })
    })

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()

    // Assert
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
