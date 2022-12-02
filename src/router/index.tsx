import { DashboardLayout, SimpleLayout } from 'layouts'
import { Navigate, useRoutes } from 'react-router-dom'

import Accounts from 'pages/Accounts'
import Dashboard from 'pages/Dashboard'
import Settings from 'pages/Settings'
import Page404 from 'pages/Page404'

const routes = [
  {
    title: 'dashboard',
    path: '/app',
    icon: 'ic_analytics',
  },
  {
    title: 'comptes',
    path: '/accounts',
    icon: 'ic_banking',
  },
  {
    title: 'paramètres',
    path: '/settings',
    icon: 'ic_settings',
  },
]

function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/app" />, index: true },
        { path: 'app', element: <Dashboard /> },
        { path: 'accounts', element: <Accounts /> },
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
    {
      path: '*',
      element: <div>not found</div>,
    },
  ])

  return routes
}

export { Router, routes }
