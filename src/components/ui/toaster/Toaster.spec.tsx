import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Toaster from './Toaster'
import { toastSender } from './ToastSender'

describe('● Render', () => {
  test('toast should auto close', () => {
    render(<Toaster />)
    act(() => {
      toastSender.info('title', 'test')
    })

    const toaster = screen.queryByTestId('toast-container')
    const toast = screen.queryByTestId('toast')

    expect(toaster).toBeTruthy()
    expect(toaster).toBeInTheDocument()
    expect(toast).toBeTruthy()
    expect(toast).toBeInTheDocument()

    act(() => {
      jest.runAllTimers()
    })

    expect(toaster).toBeTruthy()
    expect(toaster).toBeInTheDocument()
    expect(toast).not.toBeInTheDocument()
  })

  test('toast info is color primary', () => {
    render(<Toaster />)
    act(() => {
      toastSender.info('title', 'test')
    })

    const toast = screen.queryByTestId('toast')
    expect(toast).toBeTruthy()
    expect(toast).toBeInTheDocument()
    expect(toast?.classList).toContain('toast--primary')
  })

  test('toast success is color success', () => {
    render(<Toaster />)
    act(() => {
      toastSender.success('title', 'test')
    })

    const toast = screen.queryByTestId('toast')
    expect(toast).toBeTruthy()
    expect(toast).toBeInTheDocument()
    expect(toast?.classList).toContain('toast--success')
  })

  test('toast warning is color warning', () => {
    render(<Toaster />)
    act(() => {
      toastSender.warning('title', 'test')
    })

    const toast = screen.queryByTestId('toast')
    expect(toast).toBeTruthy()
    expect(toast).toBeInTheDocument()
    expect(toast?.classList).toContain('toast--warning')
  })

  test('toast error is color error', () => {
    render(<Toaster />)
    act(() => {
      toastSender.error('title', 'test')
    })

    const toast = screen.queryByTestId('toast')
    expect(toast).toBeTruthy()
    expect(toast).toBeInTheDocument()
    expect(toast?.classList).toContain('toast--error')
  })
})

describe('When user close toast', () => {
  test('should remove toast', () => {
    render(<Toaster />)
    act(() => {
      toastSender.info('title', 'test')
    })

    const toast = screen.queryByTestId('toast')
    const button = screen.getByTestId('toast-close-button')

    expect(toast).toBeTruthy()
    expect(toast).toBeInTheDocument()

    act(() => {
      fireEvent.click(button)
      jest.advanceTimersByTime(400) // wait for is-leaving animation
    })

    expect(toast).not.toBeInTheDocument()
  })
})
