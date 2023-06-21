import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'

import { render, screen } from '@/test/test-utils'

import { AppNav } from './AppNav'

describe('AppNav', () => {
  it('should render links with current location active', () => {
    // Arrange
    const links = [
      { label: 'page 1', path: '/path1' },
      { label: 'page 2', path: '/path2' },
    ]
    const current = links[0].path

    // Act
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AppNav current={current} links={links} />
                <Outlet />
              </>
            }
          >
            <Route path={links[0].path} element={<div>path 1</div>} />
            <Route path={links[1].path} element={<div>path 2</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    // Assert
    const renderedLinks = screen.getAllByRole('link')
    expect(renderedLinks).toHaveLength(2)
    expect(renderedLinks[0]).toHaveAttribute('data-active')
  })
})
