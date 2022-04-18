import '../styles/globals.scss'
import 'boxicons/css/boxicons.min.css'
import type { AppProps } from 'next/app'
import VsToaster from '../components/VsToaster'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <VsToaster />
    </>
  )
}

export default MyApp
