import { webAppI18nResources } from '@cube-frontend/i18n'

export type SupportedLanguage = keyof typeof webAppI18nResources

export const supportedLanguage: SupportedLanguage[] = Object.keys(
  webAppI18nResources,
) as SupportedLanguage[]

export const defaultLanguage = 'en-US' satisfies SupportedLanguage

export const localStorageLngKey = 'i18nextLng'
