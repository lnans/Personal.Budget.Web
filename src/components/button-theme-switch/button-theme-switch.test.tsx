import { useMantineColorScheme } from '@mantine/core'
import { fireEvent, render, screen } from 'utils/test-utils'
import { Mock, vi } from 'vitest'

import ButtonThemeSwitch from './button-theme-switch'

describe('ButtonThemeSwicth', () => {
  it('should call toggleColorScheme on click', () => {
    // Arrange
    const toggleColorSchemeMock = vi.fn()
    const useMantineColorSchemeMock = useMantineColorScheme as Mock

    useMantineColorSchemeMock.mockReturnValue({
      toggleColorScheme: toggleColorSchemeMock,
    })

    // Act
    render(<ButtonThemeSwitch />)
    fireEvent.click(screen.getByRole('button'))

    // Assert
    expect(toggleColorSchemeMock).toHaveBeenCalled()
  })
})
