import '@plugins/axios'
import '@plugins/i18n'
import App from 'App'
import 'boxicons/css/boxicons.min.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(<StrictMode children={<App />} />)
