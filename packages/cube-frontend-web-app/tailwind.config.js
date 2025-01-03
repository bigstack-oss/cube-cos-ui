import { cubeTheme } from '@cube-frontend/ui-library/src/theme'
import path from 'path'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    path.join(
      path.dirname(require.resolve('@cube-frontend/ui-library')),
      '**/*.tsx',
    ),
  ],
  theme: { extend: cubeTheme },
  plugins: [],
}
