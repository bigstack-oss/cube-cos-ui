import type { Preview } from '@storybook/react'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/urbanist/400.css'
import '@fontsource/urbanist/500.css'
import '@fontsource/urbanist/600.css'
import '@fontsource/urbanist/800.css'
import '@fontsource/noto-sans-tc/400.css'
import '@fontsource/noto-sans-tc/500.css'
import '@fontsource/noto-sans-tc/600.css'
import '@fontsource/noto-sans-tc/800.css'
import '../src/tailwind.css'
import { WithLocale } from './i18n/WithLocale'
import { i18nGlobalTypes, i18nInitialGlobals } from './i18n/globalTypes'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    options: {
      storySort: {
        order: [
          'Design Tokens',
          ['Color', 'Typography', 'Icon'],
          'Atoms',
          'Molecules',
          'Organisms',
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
  },
  globalTypes: { ...i18nGlobalTypes },
  initialGlobals: { ...i18nInitialGlobals },
  decorators: [WithLocale],
}

export default preview
