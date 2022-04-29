import { ReactNode } from 'react'
import './section-title.scss'

export interface SectionTitleProps {
  children: ReactNode
}

export default function SectionTitle(props: SectionTitleProps) {
  return <p className="section-title">{props.children}</p>
}
