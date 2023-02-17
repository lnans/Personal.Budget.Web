import { initReactI18next } from 'react-i18next'

import i18n from 'i18next'
import transFr from './fr.json'

const resources = {
  fr: { translation: transFr },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  fallbackLng: ['fr'],
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
