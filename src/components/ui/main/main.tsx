import { ReactNode } from 'react'
import './main.scss'

export interface MainProps {
  children: ReactNode
}

export default function Main(props: MainProps) {
  return <main className="main-container">{props.children}</main>
}
