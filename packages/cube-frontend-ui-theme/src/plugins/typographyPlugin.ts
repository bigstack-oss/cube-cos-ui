import {
  CSSRuleObject,
  PluginAPI,
  PluginCreator,
} from 'tailwindcss/types/config'
import { cubeTheme } from '../cubeTheme'

export type FontAttributes = Partial<{
  lineHeight: string
  letterSpacing: string
  fontWeight: string | number
}>

export type FontConfiguration = [fontSize: string, attributes: FontAttributes]

/**
 * Convert `Record<string, string | number | undefined>` to `Record<string, string | null>`.
 */
const normalizeFontAttributes = (
  attributes: FontAttributes | undefined,
): Record<string, string | null> => {
  if (!attributes) {
    return {}
  }

  const normalizedAttributes = Object.entries(attributes).map(
    ([key, value]) => [key, value?.toString() ?? null],
  )

  return Object.fromEntries(normalizedAttributes)
}

const HEADING_COUNT = 5

const createComponents = (
  prefix: string,
  count: number,
  fontFamilyKey: keyof (typeof cubeTheme)['fontFamily'],
  themeFn: PluginAPI['theme'],
): CSSRuleObject => {
  const keys = Array.from(Array(count).keys()).map(
    (_, index) => `${prefix}${index + 1}`,
  )

  const components = Object.fromEntries(
    keys.map((key) => [
      `.${key}`,
      {
        fontFamily: themeFn(`fontFamily.${fontFamilyKey}`),
        fontSize: themeFn(`fontSize.${key}`),
        ...normalizeFontAttributes(themeFn('fontSize')?.[key]?.[1]),
      },
    ]),
  ) satisfies CSSRuleObject

  return components
}

export const typographyPlugin: PluginCreator = ({ addComponents, theme }) => {
  const primaryHeadings = createComponents(
    'primary-h',
    HEADING_COUNT,
    'urbanist',
    theme,
  )
  const secondaryHeadings = createComponents(
    'secondary-h',
    HEADING_COUNT,
    'inter',
    theme,
  )
  const primaryBodies = createComponents('primary-body', 6, 'inter', theme)
  const secondaryBodies = createComponents(
    'secondary-body',
    7,
    'urbanist',
    theme,
  )

  addComponents([
    primaryHeadings,
    secondaryHeadings,
    primaryBodies,
    secondaryBodies,
  ])
}
