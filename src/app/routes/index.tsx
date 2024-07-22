import { createBrowserRouter } from 'react-router-dom'

import { AppRouteNotFoundFallback } from '@/components/fallbacks/AppRouteNotFoundFallback'
import { NavBarLinks } from '@/config/navbar'
import { ProtectedRoute } from '@/lib/auth'

import { AppRoute } from './app/AppRoute'

export const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { RootPage } = await import('./Root')
        return { Component: RootPage }
      },
    },
    {
      path: '/auth',
      lazy: async () => {
        const { LoginRoute } = await import('./auth/LoginRoute')
        return { Component: LoginRoute }
      },
    },
    {
      path: NavBarLinks.wallet.to,
      element: (
        <ProtectedRoute>
          <AppRoute />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '',
          lazy: async () => {
            const { WalletRoute } = await import('./app/wallet/WalletRoute')
            return { Component: WalletRoute }
          },
        },
      ],
    },
    {
      path: '*',
      element: <AppRouteNotFoundFallback />,
    },
  ])
