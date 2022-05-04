import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import NavBar from './Navbar'

const routes = {
  home: {
    icon: '',
    path: '/',
    name: 'home',
  },
  accounts: {
    icon: '',
    path: '/accounts',
    name: 'accounts',
  },
}

describe('● Render:', () => {
  test('default should render navbar with items', async () => {
    render(<NavBar title="Budget" currentPath="/" routes={routes} />)

    const navBar = await screen.findByRole('navigation')
    const links = screen.queryAllByTestId('navbar-link-item')

    expect(navBar).toBeTruthy()
    expect(navBar).toBeInTheDocument()
    expect(links).toBeTruthy()
    expect(links.length).toBe(2)
  })
})

describe('● When user navigate', () => {
  test('should trigger onNavigate fonction with path ', async () => {
    const onNavigate = jest.fn()
    render(<NavBar title="Budget" currentPath="/" routes={routes} onNavigate={(path) => onNavigate(path)} />)

    const links = await screen.findAllByTestId('navbar-link-item')

    act(() => {
      fireEvent.click(links[1])
    })

    expect(onNavigate).toHaveBeenCalledWith('/accounts')
  })
})
