import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources, SupportedLanguage } from './utils'

// eslint-disable-next-line import/no-named-as-default-member
const i18n = i18next.createInstance()

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: ['en-US'] satisfies SupportedLanguage[],
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
})

export default i18n
