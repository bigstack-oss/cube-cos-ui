import { CSSRuleObject, PluginCreator } from 'tailwindcss/types/config'
import { typographyMap } from '../utils/typography/typography'
import { cubeTheme } from '../cubeTheme'

export const typographyPlugin: PluginCreator = ({ addComponents }) => {
  const components: CSSRuleObject = Object.fromEntries(
    Object.entries(typographyMap).map(([className, typography]) => {
      const selector = `.${className}`
      const fontFamily = cubeTheme.fontFamily[typography.fontFamily].join(', ')
      const definition = {
        fontFamily,
        fontSize: typography.fontSize,
        lineHeight: typography.lineHeight,
        letterSpacing: typography.letterSpacing ?? null,
        fontWeight: typography.fontWeight.toString(),
      }
      return [selector, definition]
    }),
  )

  addComponents(components)
}
