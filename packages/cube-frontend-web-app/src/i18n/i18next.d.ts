import { i18nNamespaces } from '@cube-frontend/i18n'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof i18nNamespaces.webApp
  }
}
