import { i18next } from '@/lib/react-i18next'
import { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'

type TranslationProvider = {
  children: ReactNode
}

export function TranslationProvider({ children }: TranslationProvider) {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}
