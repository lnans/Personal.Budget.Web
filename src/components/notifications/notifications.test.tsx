import { Notifications as NotificationProvider } from '@mantine/notifications'
import { fireEvent, render, screen } from 'utils/test-utils'

import Notifications from './notifications'

describe('Notifications', () => {
  it('should display success message', () => {
    // Act
    render(
      <div>
        <NotificationProvider />
        <button type="button" onClick={() => Notifications.success({ message: 'message' })} />
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
        <button type="button" onClick={() => Notifications.error({ message: 'message' })} />
      </div>
    )
    fireEvent.click(screen.getByRole('button'))

    // Assert
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
