import { Main, NavBar } from '@components'
import { AccountsPage, DashboardPage, TestBedPage } from '@pages'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './app.scss'

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/')

  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const appRoutes = {
    dashboard: { path: '/', name: t('nav.dashboard'), icon: 'bx bx-tachometer' },
    accounts: { path: '/accounts', name: t('nav.accounts'), icon: 'bx bxs-wallet' },
    test: { path: '/test', name: t('nav.test'), icon: 'bx bx-test-tube' },
  }

  useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location])

  return (
    <>
      <NavBar title={t('app')} routes={appRoutes} currentPath={currentPath} onNavigate={navigate} />
      <Main>
        <Routes>
          <Route path={appRoutes.dashboard.path} element={<DashboardPage />} />
          <Route path={appRoutes.accounts.path} element={<AccountsPage />} />
          <Route path={appRoutes.test.path} element={<TestBedPage />} />
        </Routes>
      </Main>
    </>
  )
}
