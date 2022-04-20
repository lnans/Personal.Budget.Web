import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import transEn from '../locales/en.json'
import transFr from '../locales/fr.json'

const resources = {
  en: {
    translation: transEn,
  },
  fr: {
    translation: transFr,
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  fallbackLng: ['en', 'fr'],
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
