import { IconMoon, IconSun } from '@tabler/icons-react'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, Outlet } from 'react-router-dom'

import { ButtonIcon } from '@/components/Actions'
import { AppLogo } from '@/components/Elements'
import { LoadingFallback } from '@/components/Fallbacks'
import { ROUTER_LINKS } from '@/config'
import { useThemeStore } from '@/stores'

function MainLayout() {
  const { t } = useTranslation('navbar')
  const { theme, toggleTheme } = useThemeStore()
  return (
    <>
      <nav className="fixed top-0 inline-flex items-center h-nav w-screen px-6 gap-6 z-50 border-solid border-b-1 border-b-gray-100 dark:border-b-gray-600 bg-white dark:bg-gray-950">
        <AppLogo className="mx-3" />
        {Object.values(ROUTER_LINKS).map(({ path, name }) => (
          <NavLink
            key={path}
            className="flex items-center h-full px-2 border-b-2 border-b-transparent transition-all hover:border-b-gray-300 hover:text-gray-700 font-medium tracking-wide text-gray-500 aria-current-page:text-gray-950 aria-current-page:border-b-indigo-600"
            to={path}
          >
            {t(name)}
          </NavLink>
        ))}
        <div className="flex-grow" />
        <ButtonIcon icon={theme === 'light' ? <IconMoon /> : <IconSun />} onClick={toggleTheme} />
      </nav>
      <main className="flex mt-nav h-main overflow-auto relative bg-white dark:bg-gray-900">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  )
}

export default MainLayout
