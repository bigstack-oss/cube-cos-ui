import { LanguageDetectorModule } from 'i18next'
import {
  defaultLanguage,
  localStorageLngKey,
  supportedLanguage,
  SupportedLanguage,
} from './utils'

const getLanguage = (): string | null => {
  // TODO: only happened in test env. find a way to mock localStorage in vitest.
  if (typeof window === 'undefined') {
    return null
  }
  return localStorage.getItem(localStorageLngKey)
}

const setLanguage = (lng: SupportedLanguage) => {
  // TODO: only happened in test env. find a way to mock localStorage in vitest.
  if (typeof window === 'undefined') {
    return
  }
  localStorage.setItem(localStorageLngKey, lng)
}

const isValidLanguage = (
  language: string | null,
): language is SupportedLanguage => {
  return supportedLanguage.find((l) => l === language) != null
}

const localStorageLanguageDetector = {
  type: 'languageDetector',
  detect: function () {
    const lng = getLanguage()

    if (!isValidLanguage(lng)) {
      setLanguage(defaultLanguage)
      return defaultLanguage
    }

    return lng
  },
  cacheUserLanguage: function (lng: string) {
    if (!isValidLanguage(lng)) {
      throw new Error('unsupported language')
    }
    setLanguage(lng as SupportedLanguage)
  },
} satisfies LanguageDetectorModule

export default localStorageLanguageDetector
