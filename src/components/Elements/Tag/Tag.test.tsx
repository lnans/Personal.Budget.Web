import { render, screen } from '@/test/test-utils'

import { Tag } from './Tag'

describe('Tag', () => {
  it('should render', () => {
    // Arrange
    const color = '#123456'
    const colorBg = '#12345636'
    const colorBorder = '#1234565c'

    // Act
    render(<Tag label="Test" color={color} />)

    // Assert
    expect(screen.getByRole('listitem')).toBeInTheDocument()
    expect(screen.getByText('Test')).toHaveStyle({ color, 'background-color': colorBg, 'border-color': colorBorder })
  })
})
