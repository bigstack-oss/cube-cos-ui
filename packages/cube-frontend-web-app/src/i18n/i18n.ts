import i18n, { ParseKeys, Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'
import zhTw from './locales/zh-tw.json'
import en from './locales/en.json'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
  en: { translation: en },
  zhTw: { translation: zhTw },
} satisfies Resource

export type Language = (typeof supportedLanguages)[number]

export const supportedLanguages = Object.keys(resources) as Array<
  keyof typeof resources
>

export type TranslationKeys = ParseKeys<'translation'>

export const languageMenu = [
  { label: 'English', value: 'en' },
  { label: '繁體中文', value: 'zhTw' },
] satisfies { label: string; value: Language }[]

export const defaultLanguage = 'zhTw'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: defaultLanguage, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    fallbackLng: ['en'],
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
