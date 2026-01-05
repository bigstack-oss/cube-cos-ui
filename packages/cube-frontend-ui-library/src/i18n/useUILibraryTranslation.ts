import { useTranslation } from 'react-i18next'
import i18n from './i18n'
import { i18nNamespaces } from '@cube-frontend/i18n'

/**
 * Specify ui-library i18n instance here to prevent affected by outer i18n provider.
 */
export const useUILibraryTranslation: typeof useTranslation<
  typeof i18nNamespaces.uiLibrary
> = (ns, options) => {
  return useTranslation(ns, { ...options, i18n })
}
