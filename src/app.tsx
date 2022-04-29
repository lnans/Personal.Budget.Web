// React
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// styles
import 'boxicons/css/boxicons.min.css'
import './app.scss'

// plugins
import '@plugins/i18n'
import '@plugins/axios'

// Components
import { MainContainer, NavBar, RsToaster, WithAuthLoader } from '@components'
import { AccountsPage, DashboardPage, TestPage } from './pages'
import { APP_ROUTES } from '@constants'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WithAuthLoader>
      <BrowserRouter>
        <NavBar />
        <MainContainer>
          <Routes>
            <Route path={APP_ROUTES.dashboard.path} element={<DashboardPage />} />
            <Route path={APP_ROUTES.accounts.path} element={<AccountsPage />} />
            <Route path={APP_ROUTES.test.path} element={<TestPage />} />
          </Routes>
        </MainContainer>
      </BrowserRouter>
    </WithAuthLoader>
    <RsToaster />
  </React.StrictMode>
)
