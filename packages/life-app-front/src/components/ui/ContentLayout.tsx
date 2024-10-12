import { ReactNode } from 'react'

import Heading from './Heading'

type ContentLayoutProps = {
  title: string
  children: ReactNode
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div className="py-4 md:py-10 app-screen:px-content-layout">
      <div className="flex flex-col gap-4 px-4 md:gap-8 md:px-6 ">
        <Heading variant="h1">{title}</Heading>
        {children}
      </div>
    </div>
  )
}
