import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

import { MainLayout } from '@/components/Layouts'
import { ROUTER_LINKS } from '@/config'
import { lazyImport } from '@/utils/lazyImport'

const { Wallet } = lazyImport(() => import('@/features/wallet'), 'Wallet')

const routerDefinition: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { element: <Navigate to={ROUTER_LINKS.wallet.path} />, index: true },
      {
        element: <Wallet />,
        path: ROUTER_LINKS.wallet.path,
      },
    ],
  },
]

export const Router = () => useRoutes(routerDefinition)
