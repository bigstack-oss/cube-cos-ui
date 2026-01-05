import { i18nNamespaces } from '../../i18nNamespaces'
import enUS from './en-US.json'
import zhTW from './zh-TW.json'

export const webAppI18nResources = {
  'en-US': {
    [i18nNamespaces.webApp]: enUS,
  },
  'zh-TW': {
    [i18nNamespaces.webApp]: zhTW,
  },
} as const
