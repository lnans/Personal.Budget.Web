import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi, { HttpBackendOptions } from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const langDetectorOptions = {
  // order and from where user language should be detected
  order: ['cookie', 'localStorage', 'navigator'],

  // keys or params to lookup language from
  lookupCookie: 'locale',
  lookupLocalStorage: 'locale',

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // only detect languages that are in the whitelist
  checkWhitelist: true,
}

i18next
  .use(HttpApi)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init<HttpBackendOptions>({
    fallbackLng: ['en'],
    supportedLngs: ['en', 'fr'],
    detection: langDetectorOptions,
    backend: {
      loadPath: '/locales/{{ns}}/{{lng}}.json',
      requestOptions: {
        cache: 'no-store',
      },
    },
    ns: [], // Disable fallback NS behavior,
    react: {
      transKeepBasicHtmlNodesFor: ['b', 'br', 'strong', 'i', 'ul', 'ol', 'li', 'p'],
    },
  })

export { i18next }
