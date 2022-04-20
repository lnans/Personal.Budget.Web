// React
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// styles
import 'boxicons/css/boxicons.min.css'
import './styles/globals.scss'

// plugins
import './plugins/i18n'
import './plugins/axios'

// Components
import { RsToaster, WithAuthLoader } from './components'
import { IndexPage } from './pages'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RsToaster />
    <WithAuthLoader>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
        </Routes>
      </BrowserRouter>
    </WithAuthLoader>
  </React.StrictMode>
)
