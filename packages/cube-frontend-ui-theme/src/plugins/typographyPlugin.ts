import {
  CSSRuleObject,
  PluginAPI,
  PluginCreator,
} from 'tailwindcss/types/config'
import { cubeTheme, TypographyVariant } from '../cubeTheme'

type FontSizeConfig = Partial<{
  lineHeight: string
  letterSpacing: string
  fontWeight: string | number
}>

/**
 * Convert `Record<string, string | number | undefined>` to `Record<string, string | null>`.
 */
const normalizeFontConfiguration = (
  values: [fontSize: string, configuration: FontSizeConfig] | undefined,
): Record<string, string | null> => {
  const configuration = values?.[1]

  if (!configuration) {
    return {}
  }

  // Replace all `undefined` with `null` in the entries because values in
  // `addComponents` cannot be `undefined`.
  const normalizedEntries = Object.entries(configuration).map(
    ([key, value]) => [key, value?.toString() ?? null],
  )

  return Object.fromEntries(normalizedEntries)
}

const HEADING_COUNT = 5
const BODY_COUNT = 6

const createComponents = (
  variant: TypographyVariant,
  type: 'h' | 'body',
  count: number,
  fontFamilyKey: keyof (typeof cubeTheme)['fontFamily'],
  themeFn: PluginAPI['theme'],
): CSSRuleObject => {
  const keys = Array.from(Array(count).keys()).map(
    (_, index) => `${variant}-${type}${index + 1}`,
  )

  const components = Object.fromEntries(
    keys.map((key) => [
      `.${key}`,
      {
        fontFamily: themeFn(`fontFamily.${fontFamilyKey}`),
        fontSize: themeFn(`fontSize.${key}`),
        ...normalizeFontConfiguration(themeFn('fontSize')?.[key]),
      },
    ]),
  ) satisfies CSSRuleObject

  return components
}

export const typographyPlugin: PluginCreator = ({ addComponents, theme }) => {
  const primaryHeadings = createComponents(
    TypographyVariant.Primary,
    'h',
    HEADING_COUNT,
    'urbanist',
    theme,
  )
  const primaryBodies = createComponents(
    TypographyVariant.Primary,
    'body',
    BODY_COUNT,
    'inter',
    theme,
  )
  const secondaryHeadings = createComponents(
    TypographyVariant.Secondary,
    'h',
    HEADING_COUNT,
    'inter',
    theme,
  )
  const secondaryBodies = createComponents(
    TypographyVariant.Secondary,
    'body',
    BODY_COUNT,
    'urbanist',
    theme,
  )

  addComponents([
    primaryHeadings,
    primaryBodies,
    secondaryHeadings,
    secondaryBodies,
  ])
}
