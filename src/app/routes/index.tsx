import { createBrowserRouter } from 'react-router-dom'

import { AppRouteNotFoundFallback } from '@/components/fallbacks/AppRouteNotFoundFallback'
import { NavBarLinks } from '@/config/navbar'
import { ProtectedRoute } from '@/lib/auth'

import { AppPage } from './app/AppPage'

export const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { RootPage } = await import('./RootPage')
        return { Component: RootPage }
      },
    },
    {
      path: '/auth',
      lazy: async () => {
        const { LoginPage } = await import('./auth/LoginPage')
        return { Component: LoginPage }
      },
    },
    {
      path: NavBarLinks.wallet.to,
      element: (
        <ProtectedRoute>
          <AppPage />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '',
          lazy: async () => {
            const { WalletPage } = await import('./app/wallet/WalletPage')
            return { Component: WalletPage }
          },
        },
      ],
    },
    {
      path: '*',
      element: <AppRouteNotFoundFallback />,
    },
  ])
