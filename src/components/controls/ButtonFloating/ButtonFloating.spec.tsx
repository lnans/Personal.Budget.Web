import { render, screen, fireEvent } from '@testing-library/react'
import ButtonFloating from './ButtonFloating'
import { act } from 'react-dom/test-utils'

describe('● Render:', () => {
  test('default should render active', async () => {
    render(<ButtonFloating icon="test" />)

    const button = await screen.findByRole('button')

    expect(button).toBeTruthy()
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
  })
})

describe('● When user click', () => {
  test('should trigger onClick', async () => {
    // Arrange
    const onClick = jest.fn()
    render(<ButtonFloating icon="test" onClick={onClick} />)
    const button = await screen.findByRole('button')

    // Act
    act(() => {
      fireEvent.click(button)
    })

    // Assert
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
