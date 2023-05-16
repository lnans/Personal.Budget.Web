import { initReactI18next } from 'react-i18next'

import i18n from 'i18next'
import transEn from './en.json'
import transFr from './fr.json'

const translations = {
  en: { translation: transEn },
  fr: { translation: transFr },
}

i18n.use(initReactI18next).init({
  resources: translations,
  lng: 'fr',
  fallbackLng: ['en'],
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
