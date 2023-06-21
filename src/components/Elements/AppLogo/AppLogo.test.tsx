import { render, screen } from '@/test/test-utils'

import { AppLogo } from './AppLogo'

describe('AppLogo', () => {
  it('should render full logo', () => {
    // Act
    render(<AppLogo />)

    // Assert
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('should render icon logo', () => {
    // Act
    render(<AppLogo icon />)

    // Assert
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
