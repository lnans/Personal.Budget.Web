import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Dialog from './Dialog'

describe('● Render:', () => {
  test('closable should render with close button', () => {
    render(
      <Dialog show title="Test">
        Test
      </Dialog>
    )

    const dialog = screen.queryByTestId('dialog')
    const button = screen.queryByTestId('dialog-button')

    expect(dialog).toBeTruthy()
    expect(dialog).toBeInTheDocument()
    expect(button).toBeTruthy()
    expect(button).toBeInTheDocument()
  })

  test('not closable should render without close button', () => {
    render(
      <Dialog show closable={false}>
        Test
      </Dialog>
    )

    const dialog = screen.queryByTestId('dialog')
    const button = screen.queryByTestId('dialog-button')

    expect(dialog).toBeTruthy()
    expect(dialog).toBeInTheDocument()
    expect(button).not.toBeTruthy()
    expect(button).not.toBeInTheDocument()
  })

  test('with show "false" should not render dialog', () => {
    render(<Dialog show={false}>Test</Dialog>)

    const dialog = screen.queryByTestId('dialog')
    const button = screen.queryByTestId('dialog-button')

    expect(dialog).not.toBeTruthy()
    expect(dialog).not.toBeInTheDocument()
    expect(button).not.toBeTruthy()
    expect(button).not.toBeInTheDocument()
  })
})

describe('● When user close', () => {
  test('should trigger onClose function', () => {
    const onClose = jest.fn()
    render(
      <Dialog show onClose={onClose}>
        Test
      </Dialog>
    )

    const button = screen.getByTestId('dialog-button')

    act(() => {
      fireEvent.click(button)
    })
    act(() => {
      jest.runAllTimers()
    })

    expect(onClose).toBeCalledTimes(1)
  })
})
