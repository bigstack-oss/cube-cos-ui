import { PresetsConfig } from 'tailwindcss/types/config'
import { cubeTheme } from './cubeTheme'
import { cubePlugin } from './cubePlugin'

export const cubePreset = {
  theme: {
    extend: cubeTheme,
  },
  plugins: [cubePlugin],
} satisfies PresetsConfig
