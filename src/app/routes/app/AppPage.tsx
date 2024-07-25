import { IconMenu2 } from '@tabler/icons-react'
import { Suspense, useCallback } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from '@/components/ui/Drawer'
import { Logo } from '@/components/ui/Logo'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { NavBarLinks } from '@/config/navbar'
import Profile from '@/features/auth/components/Profile'

export function AppPage() {
  const { t } = useTranslation()
  const location = useLocation()

  const renderNavLinks = useCallback(() => {
    return Object.entries(NavBarLinks).map(([key, value]) => (
      <NavLink
        key={key}
        to={value.to}
        className="text-neutral-400 transition-colors hover:text-neutral-950 aria-current-page:text-neutral-950 dark:text-zinc-500 hover:dark:text-neutral-100 aria-current-page:dark:text-neutral-100"
      >
        {t(value.title)}
      </NavLink>
    ))
  }, [t])

  const renderLogoLink = useCallback(() => {
    return (
      <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
        <Logo size={24} />
        <p className="text-base md:hidden ">Life app</p>
      </Link>
    )
  }, [])

  return (
    <Suspense fallback={<div className="flex size-full items-center justify-center text-white ">...LOOOOOOOAD</div>}>
      <ErrorBoundary key={location.pathname} fallback={<div>Something went wrong!</div>}>
        <div className="flex min-h-dvh w-full flex-col">
          <header className="sticky top-0 border-b bg-white px-4 md:px-6 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mx-auto flex h-header-height max-w-app-width items-center gap-4 md:gap-6">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="icon" icon={IconMenu2} className="shrink-0 md:hidden" />
                </DrawerTrigger>
                <DrawerContent className="max-w-[290px]" side="left">
                  <DrawerTitle>{renderLogoLink()}</DrawerTitle>
                  <DrawerDescription />
                  <nav className="mt-6 grid gap-6 text-lg font-medium">{renderNavLinks()}</nav>
                </DrawerContent>
              </Drawer>

              {renderLogoLink()}

              <nav className="hidden flex-col gap-6 text-base font-medium md:flex md:flex-row md:items-center md:gap-5 lg:gap-6">
                {renderNavLinks()}
              </nav>

              <Profile />
            </div>
          </header>

          <main className="max-h-main-height">
            <ScrollArea className="h-main-height w-dvw">
              <Outlet />
            </ScrollArea>
          </main>
        </div>
      </ErrorBoundary>
    </Suspense>
  )
}
