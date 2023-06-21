import { Notifications as NotificationProvider } from '@mantine/notifications'

import { fireEvent, render, screen } from '@/test/test-utils'

import { notifySuccess, notifyError } from './Notifications'

describe('Notifications', () => {
  it('should display success message', () => {
    // Act
    render(
      <div>
        <NotificationProvider />
        <button type="button" onClick={() => notifySuccess({ message: 'message' })} />
      </div>
    )
    fireEvent.click(screen.getByRole('button'))

    // Assert
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('should display error message', () => {
    // Act
    render(
      <div>
        <NotificationProvider />
        <button type="button" onClick={() => notifyError({ message: 'message' })} />
      </div>
    )
    fireEvent.click(screen.getByRole('button'))

    // Assert
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
