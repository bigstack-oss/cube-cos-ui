import { cubeTheme } from '@cube-frontend/components/src/theme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    '../cube-frontend-components/src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: { extend: cubeTheme },
  plugins: [],
}
