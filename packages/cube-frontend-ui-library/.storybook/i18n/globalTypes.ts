import { Preview } from '@storybook/react'
import { SupportedLanguage } from '../../src/i18n/utils'

type LocaleItem = {
  title: string
  right: string
  value: SupportedLanguage
}

const localeItems: LocaleItem[] = [
  { title: 'English', right: '🇺🇸', value: 'en-US' },
  { title: '繁體中文', right: '🇹🇼', value: 'zh-TW' },
]

export const i18nGlobalTypes: Preview['globalTypes'] = {
  locale: {
    description: 'Internationalization locale',
    toolbar: {
      title: 'Locale',
      icon: 'globe',
      items: localeItems,
      dynamicTitle: true,
    },
  },
}

export const i18nInitialGlobals: Preview['initialGlobals'] = {
  locale: 'en-US' satisfies SupportedLanguage,
}
