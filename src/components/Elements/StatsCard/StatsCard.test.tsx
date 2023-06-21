import { render, screen } from '@/test/test-utils'

import { StatsCard } from './StatsCard'

describe('AppLogo', () => {
  it('should render', () => {
    // Act
    render(<StatsCard title="test" subtitle="test" amount={1} />)

    // Assert
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('should render loading state', () => {
    // Act
    render(<StatsCard title="test" subtitle="test" amount={1} isLoading />)

    // Assert
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument()
  })
})
