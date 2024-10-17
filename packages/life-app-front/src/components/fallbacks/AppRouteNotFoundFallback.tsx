import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { Button } from '../ui/Button'

export function AppRouteNotFoundFallback() {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-full w-full items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-semibold text-indigo-500">404</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl dark:text-neutral-100">{t('boundaries.not_found.title')}</h1>
        <p className="text-center text-base leading-7 text-gray-600 dark:text-gray-300">
          {t('boundaries.not_found.description')}
        </p>
        <Button asChild>
          <Link to="/">{t('actions.go_back')}</Link>
        </Button>
      </div>
    </div>
  )
}
