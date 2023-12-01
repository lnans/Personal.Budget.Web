import { TFunction } from 'i18next'
import { FallbackProps } from 'react-error-boundary'

type ErrorFallbackProps = FallbackProps & {
  t: TFunction<'translation', undefined>
}

function ErrorFallback({ error, t }: ErrorFallbackProps) {
  console.error(error)

  return (
    <div className="grid min-h-full w-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">500</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t('common:fallback.error.title')}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">{t('common:fallback.error.description')}</p>
      </div>
    </div>
  )
}

export default ErrorFallback
