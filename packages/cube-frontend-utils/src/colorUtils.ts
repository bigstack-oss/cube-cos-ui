/**
 * Converts a hex color code to RGBA format with a specified alpha value
 * @param hexCode - Hex color code (e.g., '#FF5733')
 * @param alpha - Alpha value (0 to 1)
 * @returns RGBA string (e.g., 'rgba(255, 87, 51, 0.5)')
 */
export const hexToRGBA = (hexCode: string, alpha: number) => {
  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
