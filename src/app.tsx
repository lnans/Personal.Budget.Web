import { Main, Toaster, AuthProvider } from '@components'
import { APP_ROUTES } from '@constants'
import { AccountsPage, DashboardPage, TestBedPage } from '@pages'
import NavBar, { NavBarRoute } from 'components/ui/Navbar/Navbar'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './app.scss'

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/')

  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const routes: NavBarRoute[] = Object.keys(APP_ROUTES).map((key: string) => APP_ROUTES[key])

  useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location])

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <NavBar title={t('app')} routes={routes} currentPath={currentPath} onNavigate={navigate} />
          <Main>
            <Routes>
              <Route path={APP_ROUTES.dashboard.path} element={<DashboardPage />} />
              <Route path={APP_ROUTES.accounts.path} element={<AccountsPage />} />
              <Route path={APP_ROUTES.test.path} element={<TestBedPage />} />
            </Routes>
          </Main>
        </BrowserRouter>
      </AuthProvider>
      <Toaster />
    </>
  )
}
