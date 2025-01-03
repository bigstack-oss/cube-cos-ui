import { cubeTheme } from './src/theme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: { extend: cubeTheme },
  plugins: [],
}
