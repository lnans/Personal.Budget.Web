import { createBrowserRouter } from 'react-router-dom'

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
      path: '/app',
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
      lazy: async () => {
        const { NotFoundRoute } = await import('./NotFoundRoute')
        return { Component: NotFoundRoute }
      },
    },
  ])
