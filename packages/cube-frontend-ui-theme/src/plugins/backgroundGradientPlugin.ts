import { PluginCreator } from 'tailwindcss/types/config'

export const backgroundGradientPlugin: PluginCreator = ({
  addUtilities,
  theme,
}) => {
  // Values such as `linear-gradient` are invalid for the `background-color`
  // CSS property. These utilities were added to make it easier to apply
  // gradient backgrounds to elements.
  addUtilities({
    '.background-scene-gradient': {
      background: theme('colors.scene.gradient'),
    },
  })
}
