import { cubePreset } from '@cube-frontend/ui-theme'

const { colors } = cubePreset.theme.extend

/**
 * Retrieve color value from cubeTheme with the provided bg class name.
 * For example, from `bg-primary-500` to `#4C68F9`.
 */
export const resolveThemeColor = (bgClassName: string): string | undefined => {
  const isPureColor =
    !bgClassName.includes('gradient') && bgClassName.startsWith('bg-')
  if (!isPureColor) {
    return undefined
  }

  // - 'bg-primary-500' -> ['primary', '500']
  // - 'bg-functional-hover-grey-darker' -> ['functional', 'hover', 'grey', 'darker']
  const [categoryKey, ...propertyKeyParts] = bgClassName
    .replace('bg-', '')
    .split('-')

  // ['hover', 'grey', 'darker'] -> 'hover-grey-darker
  const propertyKey = propertyKeyParts.join('-')

  if (!categoryKey || !propertyKey) {
    console.warn(`Invalid bgClassName: ${bgClassName}`)
    return undefined
  }

  const category = colors[categoryKey as keyof typeof colors]
  const colorValue = category[propertyKey as keyof typeof category]

  if (!colorValue) {
    console.warn(`Invalid bgClassName: ${bgClassName}`)
    return undefined
  }

  return colorValue
}

const REQUIRED_HEX_REGEX = /^#[a-fA-F\d]{6}$/

/**
 * Convert a hex string to a number array.
 * For example, from `#4C68F9` to `[76, 104, 249]`.
 */
export const hexToRgb = (
  hex: string,
): [r: number, g: number, b: number] | undefined => {
  if (!hex.startsWith('#') || !REQUIRED_HEX_REGEX.test(hex)) {
    console.warn(
      `Invalid hex value: ${hex}. Hex value must match ${REQUIRED_HEX_REGEX.source}`,
    )
    return undefined
  }

  // Remove the leading '#'.
  hex = hex.substring(1)

  // Example: '#1AF0C3'
  const [r, g, b] = [
    // '1A'
    hex.substring(0, 2),
    // 'F0'
    hex.substring(2, 4),
    // 'C3'
    hex.substring(4, 6),
  ].map((component) => parseInt(component, 16))

  return [r, g, b]
}
