import { MainLayout } from 'layouts'
import { Accounts, Settings } from 'pages'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const ROUTER_LINKS = {
  accounts: {
    label: 'appbar.accounts',
    path: '/accounts',
  },
  settings: {
    label: 'appbar.settings',
    path: '/settings',
  },
} as const

const routerDefinition: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { element: <Navigate to="/accounts" />, index: true },
      { element: <Accounts />, path: ROUTER_LINKS.accounts.path },
      { element: <Settings />, path: ROUTER_LINKS.settings.path },
    ],
  },
]

const Router = () => useRoutes(routerDefinition)

export { Router, ROUTER_LINKS }
