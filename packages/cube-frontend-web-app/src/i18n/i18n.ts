import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import localStorageLanguageDetector from './localStorageLanguageDetector'
import { resources, SupportedLanguage } from './utils'

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(initReactI18next)
  .use(localStorageLanguageDetector)
  .init({
    resources: resources,
    fallbackLng: ['en'] satisfies SupportedLanguage[],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

/**
 * Reload the page when language changes to make sure all dayjs instances are updated.
 *
 * Some dayjs instances are still hold the old locale,
 * even after calling `dayjs.locale(newLocale)`
 *
 * for example;
 *
 * ```tsx
 * const [now, setNow] = useState(dayjs())
 * ```
 *
 * The `now` will still hold the old locale after rerender and will cause language inconsistency.
 *
 **/
i18n.on('languageChanged', () => {
  window.location.reload()
})

export default i18n
