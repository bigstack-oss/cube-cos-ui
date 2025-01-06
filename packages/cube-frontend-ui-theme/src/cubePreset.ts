import { PresetsConfig } from 'tailwindcss/types/config'
import { cubeTheme } from './cubeTheme'
import { cubePlugin } from './cubePlugin'

export const cubePreset = {
  theme: cubeTheme,
  plugins: [cubePlugin],
} satisfies PresetsConfig
