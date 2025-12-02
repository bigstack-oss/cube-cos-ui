import { PropsWithChildren, useEffect } from 'react'
import { SupportedLanguage } from './utils'
import i18n from './i18n'

import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/zh-tw'

dayjs.locale(i18n.language)

export type LocaleProviderProps = PropsWithChildren<{
  locale: SupportedLanguage
}>

export const LocaleProvider = (props: LocaleProviderProps) => {
  const { locale, children } = props

  useEffect(() => {
    i18n.changeLanguage(locale)
    dayjs.locale(locale)
  }, [locale])

  return children
}
