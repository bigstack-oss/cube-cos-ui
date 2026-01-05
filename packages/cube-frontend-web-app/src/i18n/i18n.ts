import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import localStorageLanguageDetector from './localStorageLanguageDetector'
import { SupportedLanguage } from './utils'
import { webAppI18nResources, i18nNamespaces } from '@cube-frontend/i18n'

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(initReactI18next)
  .use(localStorageLanguageDetector)
  .init({
    defaultNS: i18nNamespaces.webApp,
    resources: webAppI18nResources,
    fallbackLng: ['en-US'] satisfies SupportedLanguage[],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
