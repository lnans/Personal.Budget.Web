import { useMantineColorScheme } from '@mantine/core'
import { Mock, vi } from 'vitest'

import { fireEvent, render, screen } from '@/test/test-utils'

import { SwitchTheme } from './SwitchTheme'

describe('ButtonThemeSwicth', () => {
  it('should call toggleColorScheme on click', () => {
    // Arrange
    const toggleColorSchemeMock = vi.fn()
    const useMantineColorSchemeMock = useMantineColorScheme as Mock

    useMantineColorSchemeMock.mockReturnValue({
      toggleColorScheme: toggleColorSchemeMock,
    })

    // Act
    render(<SwitchTheme />)
    fireEvent.click(screen.getByRole('button'))

    // Assert
    expect(toggleColorSchemeMock).toHaveBeenCalled()
  })
})
