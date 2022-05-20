import { act, fireEvent, render, screen } from '@testing-library/react'
import CheckBox from './CheckBox'

describe('● Render:', () => {
  test('should render checked', async () => {
    render(<CheckBox label="Test" value={true} />)

    const checkbox = await screen.findByRole('checkbox')

    expect(checkbox).toBeTruthy()
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toBeChecked()
  })

  test('should render unchecked', async () => {
    render(<CheckBox label="Test" value={false} />)

    const checkbox = await screen.findByRole('checkbox')

    expect(checkbox).toBeTruthy()
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
  })

  test('should render disabled', async () => {
    render(<CheckBox label="Test" value={false} disabled />)

    const checkbox = await screen.findByRole('checkbox')

    expect(checkbox).toBeTruthy()
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toBeDisabled()
  })
})

describe('● When user click:', () => {
  test('should trigger "true" when is active and unchecked', async () => {
    const onClick = jest.fn()

    render(<CheckBox label="Test" value={false} onChange={(value) => onClick(value)} />)

    const checkbox = await screen.findByRole('checkbox')

    // Act
    act(() => {
      fireEvent.click(checkbox)
    })

    // Assert
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledWith(true)
  })

  test('should trigger "false" when is active and checked', async () => {
    const onClick = jest.fn()

    render(<CheckBox label="Test" value={true} onChange={(value) => onClick(value)} />)

    const checkbox = await screen.findByRole('checkbox')

    // Act
    act(() => {
      fireEvent.click(checkbox)
    })

    // Assert
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledWith(false)
  })
})
