import { i18nNamespaces } from './i18nNamespaces'
import uiLibraryEnUS from './resources/ui-library/en-US.json'
import webAppEnUS from './resources/web-app/en-US.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      [i18nNamespaces.webApp]: typeof webAppEnUS
      [i18nNamespaces.uiLibrary]: typeof uiLibraryEnUS
    }
  }
}
