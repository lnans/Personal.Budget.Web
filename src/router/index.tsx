import { DashboardLayout, SimpleLayout } from 'layouts'
import { Navigate, useRoutes } from 'react-router-dom'

import AccountsList from 'pages/accounts/list/AccountsList'
import Dashboard from 'pages/Dashboard'
import Settings from 'pages/Settings'
import Page404 from 'pages/Page404'
import Operations from 'pages/Operations'

export type NavItemLink = {
  title: string
  path: string
  children?: NavItemLink[]
  icon?: string
}

export type RoutesDefinition = {
  subheader: string
  items: NavItemLink[]
}

const routes: RoutesDefinition = {
  subheader: 'nav.title',
  items: [
    { title: 'nav.links.dashboard', path: '/dashboard', icon: 'ic_analytics' },
    {
      title: 'nav.links.finances',
      icon: 'ic_banking',
      path: '/finance',
      children: [
        { title: 'nav.links.accounts', path: '/finance/accounts' },
        { title: 'nav.links.operations', path: '/finance/operations' },
      ],
    },
    { title: 'nav.links.settings', path: '/settings', icon: 'ic_settings' },
  ],
}

function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'finance/accounts', element: <AccountsList /> },
        { path: 'finance/operations', element: <Operations /> },
        { path: 'settings', element: <Settings /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
  ])

  return routes
}

export { Router, routes }
