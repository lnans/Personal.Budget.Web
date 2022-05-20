import { act, fireEvent, render, screen } from '@testing-library/react'
import { UseFormRegister } from 'react-hook-form'
import DatePicker from './DatePicker'

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
    render(<DatePicker label="test" defaultValue="" register={register} name="value" />)

    const input = await screen.findByTestId('date-picker')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
    expect(input).not.toBeDisabled()
  })

  test('disabled should render disabled', async () => {
    render(<DatePicker label="test" defaultValue="" register={register} name="value" disabled />)

    const input = await screen.findByTestId('date-picker')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
    expect(input).toBeDisabled()
  })

  test('with error should render error label', async () => {
    render(<DatePicker label="test" defaultValue="" register={register} name="value" error="error" />)

    const input = await screen.findByLabelText('error')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
  })
})

describe('● When user', () => {
  test('focus should open calendar', async () => {
    render(<DatePicker label="test" defaultValue="" register={register} name="value" />)

    const input = await screen.findByTestId('date-picker')

    let calendar = screen.queryByTestId('date-picker-calendar')
    expect(calendar).toBeNull()

    act(() => {
      fireEvent.focus(input)
    })

    calendar = await screen.findByTestId('date-picker-calendar')
    expect(calendar).toBeInTheDocument()
  })

  test('select date should trigger onChange', async () => {
    const { onChange } = register('value')
    render(<DatePicker label="test" defaultValue="" register={register} name="value" />)

    const input = await screen.findByTestId('date-picker')

    act(() => {
      fireEvent.focus(input)
    })

    const calendarDays = await screen.findAllByTestId('date-picker-day')
    expect(calendarDays[15]).toBeInTheDocument()

    act(() => {
      fireEvent.click(calendarDays[15])
    })

    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
