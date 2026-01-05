import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { SupportedLanguage } from './utils'
import { uiLibraryI18nResources, i18nNamespaces } from '@cube-frontend/i18n'

// eslint-disable-next-line import/no-named-as-default-member
const i18n = i18next.createInstance()

i18n.use(initReactI18next).init({
  defaultNS: i18nNamespaces.uiLibrary,
  resources: uiLibraryI18nResources,
  fallbackLng: ['en-US'] satisfies SupportedLanguage[],
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
})

export default i18n
