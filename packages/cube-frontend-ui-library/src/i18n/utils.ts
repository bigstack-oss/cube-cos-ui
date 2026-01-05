import { uiLibraryI18nResources } from '@cube-frontend/i18n'

export type SupportedLanguage = keyof typeof uiLibraryI18nResources

export const defaultLanguage = 'en-US' satisfies SupportedLanguage

export const localStorageLngKey = 'i18nextLng'
