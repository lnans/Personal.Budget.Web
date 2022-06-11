import { act, fireEvent, render, screen } from '@testing-library/react'
import { UseFormRegister } from 'react-hook-form'
import CurrencyInput from './CurrencyInput'

type TestRequest = { value: number }
const onChange = jest.fn()
const register: UseFormRegister<TestRequest> = () => ({
  ref: () => jest.fn(),
  onChange,
  onBlur: jest.fn(),
  name: 'value',
})

describe('● Render:', () => {
  test('default should render active', async () => {
    render(<CurrencyInput label="Field" register={register} name="value" />)

    const input = await screen.findByLabelText('Field')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
    expect(input).not.toBeDisabled()
  })

  test('disabled should render disabled', async () => {
    render(<CurrencyInput label="Field" register={register} name="value" disabled />)

    const input = await screen.findByLabelText('Field')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
    expect(input).toBeDisabled()
  })

  test('with errors should render error label', async () => {
    render(<CurrencyInput label="Field" register={register} name="value" error="error" />)

    const error = await screen.findByLabelText('error')

    expect(error).toBeTruthy()
    expect(error).toBeInTheDocument()
  })
})

describe('● When user type', () => {
  afterEach(() => jest.clearAllMocks())
  test('should trigger onChange', async () => {
    const { onChange } = register('value')
    render(<CurrencyInput label="Field" defaultValue={0} register={register} name="value" />)
    const input = await screen.findByLabelText('Field')

    act(() => {
      fireEvent.change(input, { target: { value: '10' } })
    })

    // Assert
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
