import { PropsWithChildren } from 'react'
import { I18nextProvider, useTranslation } from 'react-i18next'
import { LocaleProvider } from '@cube-frontend/ui-library'
import i18n from './i18n'
import { SupportedLanguage } from './utils'

const UILibraryLocaleProvider = (props: PropsWithChildren) => {
  const { i18n } = useTranslation()
  return (
    <LocaleProvider locale={i18n.language as SupportedLanguage}>
      {props.children}
    </LocaleProvider>
  )
}

export const I18nProvider = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <I18nextProvider i18n={i18n}>
      <UILibraryLocaleProvider>{children}</UILibraryLocaleProvider>
    </I18nextProvider>
  )
}
