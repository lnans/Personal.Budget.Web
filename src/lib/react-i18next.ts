import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import transEn from '@/locals/en.json'
import transFr from '@/locals/fr.json'

let lng = 'fr'
dayjs.locale(lng)

if (typeof localStorage !== 'undefined') {
  lng = localStorage.getItem('i18nextLng') || 'fr'
  dayjs.locale(lng)
}

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
