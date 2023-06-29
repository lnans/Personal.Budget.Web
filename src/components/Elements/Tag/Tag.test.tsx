import { render, screen } from '@/test/test-utils'

import { Tag } from './Tag'

describe('Tag', () => {
  it('should render', () => {
    // Act
    render(<Tag label="Test" color="blue" />)

    // Assert
    expect(screen.getByRole('listitem')).toBeInTheDocument()
  })
})
