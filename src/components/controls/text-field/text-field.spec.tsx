import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import TextField from './text-field'

describe('● Render:', () => {
  test('default should render active', async () => {
    render(<TextField label="Field" value="Value" />)

    const input = await screen.findByRole('textbox')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
  })

  test('loading should render disabled', async () => {
    render(<TextField label="Field" value="Value" loading />)

    const input = await screen.findByRole('textbox')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
    expect(input).toBeDisabled()
  })

  test('disabled should render disabled', async () => {
    render(<TextField label="Field" value="Value" disabled />)

    const input = await screen.findByRole('textbox')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
    expect(input).toBeDisabled()
  })

  test('with message should render error label', async () => {
    render(<TextField label="Field" value="Value" message="error" />)

    const input = await screen.findByLabelText('error')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
  })

  test('with icon should render span icon', async () => {
    render(<TextField label="Field" value="Value" icon="error" />)

    const input = await screen.findAllByTestId('input__icon')

    expect(input.length).toBe(1)
    expect(input[0]).toBeTruthy()
    expect(input[0]).toBeInTheDocument()
  })

  test('password should render with password type', async () => {
    render(<TextField label="Field" value="Value" type="password" />)

    const input = await screen.findByLabelText('Field')

    expect(input).toBeTruthy()
    expect(input).toBeInTheDocument()
    expect(input.getAttribute('type')).toBe('password')
  })
})

describe('● When user type:', () => {
  test('something should trigger value', async () => {
    // Arrange
    const onChange = jest.fn()
    render(<TextField label="Field" value="" onChange={(value) => onChange(value)} />)
    const input = await screen.findByRole('textbox')

    // Act
    act(() => {
      fireEvent.change(input, { target: { value: 'v' } })
    })

    // Assert
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('v')
  })

  test('"Enter" should trigger onEnterKey', async () => {
    // Arrange
    const onEnter = jest.fn()
    render(<TextField label="Field" value="" onEnterKey={onEnter} />)
    const input = await screen.findByRole('textbox')

    // Act
    act(() => {
      fireEvent.keyUp(input, { key: 'Enter', code: 'Enter', charCode: 13 })
    })

    // Assert
    expect(onEnter).toHaveBeenCalledTimes(1)
  })
})
