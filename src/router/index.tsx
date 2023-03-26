import { DashboardLayout, SimpleLayout } from 'layouts'
import { Navigate, useRoutes } from 'react-router-dom'

import AccountsList from 'pages/accounts/list/AccountsList'
import Dashboard from 'pages/Dashboard'
import Operations from 'pages/Operations'
import Page404 from 'pages/Page404'
import Settings from 'pages/Settings'
import AccountAddForm from 'pages/accounts/forms/AccountAddForm'

const PATH_ROUTES = {
  dashboard: {
    title: 'nav.links.dashboard',
    path: '/dashboard',
    icon: 'ic_analytics',
  },
  finance: {
    title: 'nav.links.finances',
    path: '/finance',
    icon: 'ic_banking',
    accounts: {
      title: 'nav.links.accounts',
      path: '/finance/accounts',
      new: {
        title: 'nav.links.accounts',
        path: '/finance/accounts/new',
      },
    },
    operations: {
      title: 'nav.links.operations',
      path: '/finance/operations',
    },
  },
  settings: {
    title: 'nav.links.settings',
    path: '/settings',
    icon: 'ic_settings',
  },
}

function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={PATH_ROUTES.dashboard.path} />, index: true },
        { path: PATH_ROUTES.dashboard.path, element: <Dashboard /> },
        { path: PATH_ROUTES.finance.accounts.path, element: <AccountsList /> },
        { path: PATH_ROUTES.finance.accounts.new.path, element: <AccountAddForm /> },
        { path: PATH_ROUTES.finance.operations.path, element: <Operations /> },
        { path: PATH_ROUTES.settings.path, element: <Settings /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
  ])

  return routes
}

export { Router, PATH_ROUTES }
