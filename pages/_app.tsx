import '../styles/globals.scss'
import 'boxicons/css/boxicons.min.css'
import type { AppProps } from 'next/app'
import VsToaster from '../components/VsToaster'
import { appWithTranslation } from 'next-i18next'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <VsToaster />
    </>
  )
}

export default appWithTranslation(MyApp)
