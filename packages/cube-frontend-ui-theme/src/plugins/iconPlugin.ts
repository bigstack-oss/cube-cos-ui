import { PluginCreator } from 'tailwindcss/types/config'

export const iconPlugin: PluginCreator = ({ addComponents }) => {
  addComponents({
    '.icon-xs': {
      width: '10px',
      height: '10px',
    },
    '.icon-frame-xs': {
      width: '16px',
      height: '16px',
    },
    '.icon-sm': {
      width: '12px',
      height: '12px',
    },
    '.icon-frame-sm': {
      width: '24px',
      height: '24px',
    },
    '.icon-md-sm': {
      width: '14px',
      height: '14px',
    },
    '.icon-frame-md-sm': {
      width: '28px',
      height: '28px',
    },
    '.icon-md': {
      width: '16px',
      height: '16px',
    },
    '.icon-frame-md': {
      width: '32px',
      height: '32px',
    },
    '.icon-lg': {
      width: '18px',
      height: '18px',
    },
    '.icon-frame-lg': {
      width: '40px',
      height: '40px',
    },
    '.icon-xl': {
      width: '24px',
      height: '24px',
    },
    '.icon-frame-xl': {
      width: '48px',
      height: '48px',
    },
  })
}
