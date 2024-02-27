import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import { STORAGE_PREFIX } from '@/config'

const langDetectorOptions = {
  // order and from where user language should be detected
  order: ['cookie', 'localStorage', 'navigator'],

  // keys or params to lookup language from
  lookupCookie: 'locale',
  lookupLocalStorage: `${STORAGE_PREFIX}locale`,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // only detect languages that are in the whitelist
  checkWhitelist: true,

  convertDetectedLanguage: (lng: string) => lng.split('-')[0],
}

i18next
  .use(HttpApi)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: ['fr'],
    supportedLngs: ['fr', 'en'],
    detection: langDetectorOptions,
    backend: {
      loadPath: '/locales/{{ns}}/{{lng}}.json',
    },
    ns: [], // Disable fallback NS behavior,
  })

export { i18next }
