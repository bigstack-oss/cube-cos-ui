import { Decorator } from '@storybook/react-vite'
import { LocaleProvider } from '../../src/i18n/LocaleProvider'

export const WithLocale: Decorator = (Story, context) => {
  const { locale } = context.globals

  return (
    <LocaleProvider locale={locale}>
      <Story />
    </LocaleProvider>
  )
}
