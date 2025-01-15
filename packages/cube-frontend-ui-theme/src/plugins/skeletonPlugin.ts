import { PluginCreator } from 'tailwindcss/types/config'

export const skeletonPlugin: PluginCreator = ({ addComponents, theme }) => {
  const skeletonColor = theme('colors.functional.skeleton')

  addComponents({
    '.cos-skeleton': {
      background: `linear-gradient(90deg, transparent 60%, rgba(255, 255, 255, .5) 70%, transparent 80%) ${skeletonColor}`,
      backgroundSize: '200% 100%',
      backgroundPositionX: '180%',
    },
  })
}
