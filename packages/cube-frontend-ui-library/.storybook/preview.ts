import type { Preview } from '@storybook/react'
import '@fontsource/inter'
import '../src/tailwind.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['designTokens', 'components', 'demo'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
