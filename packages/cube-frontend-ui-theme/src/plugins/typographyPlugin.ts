import { CSSRuleObject, PluginCreator } from 'tailwindcss/types/config'
import { typographyMap } from '../utils/typography/typography'

export const typographyPlugin: PluginCreator = ({ addComponents }) => {
  const components: CSSRuleObject = Object.fromEntries(
    Object.entries(typographyMap).map(([className, typography]) => {
      const selector = `.${className}`
      const definition = {
        fontFamily: typography.fontFamily,
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
