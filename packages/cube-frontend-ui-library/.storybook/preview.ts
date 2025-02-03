import type { Preview } from '@storybook/react'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/urbanist/400.css'
import '@fontsource/urbanist/500.css'
import '@fontsource/urbanist/600.css'
import '@fontsource/urbanist/800.css'
import '../src/tailwind.css'

const preview: Preview = {
  parameters: {
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
}

export default preview
