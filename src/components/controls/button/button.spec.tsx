import Button from './button'
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

describe('● Render:', () => {
  test('default should render active', async () => {
    render(<Button>Test button</Button>)

    const button = await screen.findByRole('button')

    expect(button).toBeTruthy()
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
  })

  test('loading should render disabled', async () => {
    render(<Button loading>Test button</Button>)

    const button = await screen.findByRole('button')

    expect(button).toBeTruthy()
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  test('disabled should render disabled', async () => {
    render(<Button disabled>Test button</Button>)

    const button = await screen.findByRole('button')

    expect(button).toBeTruthy()
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })
})

describe('● When user click', () => {
  test('should trigger when is active', async () => {
    // Arrange
    const onClick = jest.fn()
    render(<Button onClick={onClick} />)
    const button = await screen.findByRole('button')

    // Act
    act(() => {
      fireEvent.click(button)
    })
    act(() => {
      jest.runAllTimers() // execute timers for ripple effect
    })

    // Assert
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('should not trigger when is disabled', async () => {
    // Arrange
    const onClick = jest.fn()
    render(<Button onClick={onClick} disabled />)
    const button = await screen.findByRole('button')

    // Act
    fireEvent.click(button)

    // Assert
    expect(onClick).toHaveBeenCalledTimes(0)
  })

  test('should not trigger when is loading', async () => {
    // Arrange
    const onClick = jest.fn()
    render(<Button onClick={onClick} loading />)
    const button = await screen.findByRole('button')

    // Act
    fireEvent.click(button)

    // Assert
    expect(onClick).toHaveBeenCalledTimes(0)
  })
})
