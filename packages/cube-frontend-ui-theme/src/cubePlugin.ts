import { PluginCreator } from 'tailwindcss/types/config'

export const cubePlugin: PluginCreator = ({ addUtilities }) => {
  addUtilities({
    '.icon-sm': {
      width: '12px',
      height: '12px',
    },
    '.icon-md': {
      width: '16px',
      height: '16px',
    },
    '.icon-lg': {
      width: '20px',
      height: '20px',
    },
    '.icon-xl': {
      width: '24px',
      height: '24px',
    },
  })
}
