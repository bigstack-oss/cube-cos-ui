import { i18nNamespaces } from '../../i18nNamespaces'
import enUS from './en-US.json'
import zhTW from './zh-TW.json'

export const uiLibraryI18nResources = {
  'en-US': {
    [i18nNamespaces.uiLibrary]: enUS,
  },
  'zh-TW': {
    [i18nNamespaces.uiLibrary]: zhTW,
  },
} as const
