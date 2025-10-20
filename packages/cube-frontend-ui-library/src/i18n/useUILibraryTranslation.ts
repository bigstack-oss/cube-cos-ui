import { useTranslation } from 'react-i18next'
import i18n from './i18n'

/**
 * Specify ui-library i18n instance here to prevent affected by outer i18n provider.
 */
export const useUILibraryTranslation: typeof useTranslation = (ns, options) => {
  return useTranslation(ns, { ...options, i18n })
}
