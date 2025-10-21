import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import localStorageLanguageDetector from './localStorageLanguageDetector'
import { resources, SupportedLanguage } from './utils'

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(initReactI18next)
  .use(localStorageLanguageDetector)
  .init({
    resources,
    fallbackLng: ['en-US'] satisfies SupportedLanguage[],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
