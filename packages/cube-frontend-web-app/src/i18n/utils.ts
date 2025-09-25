import { ParseKeys, Resource } from 'i18next'
import zhTw from './locales/zh-TW.json'
import en from './locales/en.json'

export const resources = {
  en: { translation: en },
  'zh-TW': { translation: zhTw },
} satisfies Resource

export type SupportedLanguage = keyof typeof resources

export const languageMenu = [
  { label: 'English', value: 'en' },
  { label: '繁體中文', value: 'zh-TW' },
] satisfies { label: string; value: SupportedLanguage }[]

export const defaultLanguage = 'en' satisfies SupportedLanguage

export type TranslationKeys = ParseKeys<'translation'>

export const localStorageLngKey = 'i18nextLng'
