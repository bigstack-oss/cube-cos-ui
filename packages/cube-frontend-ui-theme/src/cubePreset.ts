import { PresetsConfig } from 'tailwindcss/types/config'
import { cubeTheme } from './cubeTheme'
import { backgroundGradientPlugin } from './plugins/backgroundGradientPlugin'
import { iconPlugin } from './plugins/iconPlugin'
import { skeletonPlugin } from './plugins/skeletonPlugin'
import { typographyPlugin } from './plugins/typographyPlugin'

export const cubePreset = {
  theme: {
    extend: cubeTheme,
  },
  plugins: [
    backgroundGradientPlugin,
    iconPlugin,
    skeletonPlugin,
    typographyPlugin,
  ],
} satisfies PresetsConfig
