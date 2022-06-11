import { act, fireEvent, render, screen } from '@testing-library/react'
import './SwitchInput'
import SwitchInput from './SwitchInput'

describe('● Render:', () => {
  test('should render checked', async () => {
    render(<SwitchInput textOn="test" textOff="test" defaultChecked={true} />)

    const checkbox = await screen.findByRole('checkbox')

    expect(checkbox).toBeTruthy()
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toBeChecked()
  })

  test('should render unchecked', async () => {
    render(<SwitchInput textOn="test" textOff="test" />)

    const checkbox = await screen.findByRole('checkbox')

    expect(checkbox).toBeTruthy()
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
  })
})

describe('● When user click:', () => {
  test('should trigger onChange', async () => {
    // Arrange
    const onChange = jest.fn()
    render(<SwitchInput textOn="test" textOff="test" onChange={onChange} />)

    const checkbox = await screen.findByRole('checkbox')

    act(() => {
      fireEvent.click(checkbox)
    })

    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
