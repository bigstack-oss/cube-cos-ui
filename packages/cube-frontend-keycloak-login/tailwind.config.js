// Since `tailwind.config.js` is excluded from both tsconfig and Vite,
// we currently need to import values from the `/src` folder.
// More details: https://github.com/tailwindlabs/tailwindcss/issues/11097#issuecomment-1526886184
import { cubePreset } from '@cube-frontend/ui-theme/src'
import path from 'path'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{ts,tsx}',
    path.join(
      path.dirname(require.resolve('@cube-frontend/ui-library')),
      '**/*.{ts,tsx}',
    ),
  ],
  presets: [cubePreset],
}
