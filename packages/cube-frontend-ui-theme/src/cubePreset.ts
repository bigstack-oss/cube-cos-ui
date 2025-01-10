import { PresetsConfig } from 'tailwindcss/types/config'
import { cubeTheme } from './cubeTheme'
import { iconPlugin } from './plugins/iconPlugin'
import { typographyPlugin } from './plugins/typographyPlugin'

export const cubePreset = {
  theme: {
    extend: cubeTheme,
  },
  plugins: [iconPlugin, typographyPlugin],
} satisfies PresetsConfig
