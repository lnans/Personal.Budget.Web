import { act, fireEvent, render, screen } from '@testing-library/react'
import { UseFormRegister } from 'react-hook-form'
import CheckBox from './CheckBox'

type TestRequest = { value: boolean }
const onChange = jest.fn()
const register: UseFormRegister<TestRequest> = () => ({
  ref: () => jest.fn(),
  onChange,
  onBlur: jest.fn(),
  name: 'value',
})

describe('● Render:', () => {
  test('should render checked', async () => {
    render(<CheckBox label="Test" defaultValue={true} />)

    const checkbox = await screen.findByRole('checkbox')

    expect(checkbox).toBeTruthy()
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toBeChecked()
  })

  test('should render unchecked', async () => {
    render(<CheckBox label="Test" defaultValue={false} />)

    const checkbox = await screen.findByRole('checkbox')

    expect(checkbox).toBeTruthy()
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
  })

  test('should render disabled', async () => {
    render(<CheckBox label="Test" defaultValue={false} disabled />)

    const checkbox = await screen.findByRole('checkbox')

    expect(checkbox).toBeTruthy()
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toBeDisabled()
  })
})

describe('● When user click:', () => {
  test('should trigger onChange when is active', async () => {
    const { onChange } = register('value')

    render(<CheckBox label="Test" defaultValue={false} register={register} name="value" />)

    const checkbox = await screen.findByRole('checkbox')

    // Act
    act(() => {
      fireEvent.click(checkbox)
    })

    // Assert
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
