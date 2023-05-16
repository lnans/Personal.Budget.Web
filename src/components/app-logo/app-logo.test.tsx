import { render, screen } from 'utils/test-utils'

import AppLogo from './app-logo'

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
