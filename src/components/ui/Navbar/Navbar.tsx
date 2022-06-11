import './Navbar.scss'

export type NavBarRoute = {
  name: string
  path: string
  icon: string
}
export type NavBarRoutes = {
  [key in string]: NavBarRoute
}

export interface NavBarProps {
  title: string
  currentPath: string
  routes: NavBarRoutes
  onNavigate?: (path: string) => void
}

export default function NavBar(props: NavBarProps) {
  const { title, currentPath, routes, onNavigate } = props

  const routesArray = Object.keys(routes).map((key: string) => routes[key])
  const handleNavigation = (path: string) => {
    onNavigate && onNavigate(path)
  }

  return (
    <nav className="navbar">
      <p className="navbar__title">{title}</p>
      <div className="navbar__links">
        {routesArray.map((route, idx) => (
          <button
            className={currentPath === route.path ? 'navbar-link-item navbar-link-item--current' : 'navbar-link-item'}
            onClick={() => handleNavigation(route.path)}
            key={idx}
            data-testid="navbar-link-item"
          >
            <i className={route.icon}></i>
            {route.name}
          </button>
        ))}
      </div>
    </nav>
  )
}
