import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

import { MainLayout } from '@/components/Layouts'
import { NAVIGATION_LINKS } from '@/config'
import { lazyImport } from '@/utils'

const { Accounts } = lazyImport(() => import('@/features/accounts'), 'Accounts')
const { Operations } = lazyImport(() => import('@/features/operations'), 'Operations')
const { Settings } = lazyImport(() => import('@/features/settings'), 'Settings')

const routerDefinition: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { element: <Navigate to="/accounts" />, index: true },
      { element: <Accounts />, path: NAVIGATION_LINKS.accounts.path, children: [{ element: <Operations />, index: true }] },
      { element: <Settings />, path: NAVIGATION_LINKS.settings.path },
    ],
  },
]

export const Router = () => useRoutes(routerDefinition)
