export interface AppNavRoute {
  path: string
  name: string
  icon: string
}
export type AppNavNames = 'dashboard' | 'accounts' | 'test'
export type AppNavRoutes = {
  [key in AppNavNames]: AppNavRoute
}
export const APP_ROUTES: AppNavRoutes = {
  dashboard: {
    path: '/',
    name: 'nav.dashboard',
    icon: 'bx bx-tachometer',
  },
  accounts: {
    path: '/accounts',
    name: 'nav.accounts',
    icon: 'bx bxs-wallet',
  },
  test: {
    path: '/test',
    name: 'nav.test',
    icon: 'bx bx-test-tube',
  },
}
