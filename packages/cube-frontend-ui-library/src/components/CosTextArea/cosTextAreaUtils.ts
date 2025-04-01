const normalizeValue = (
  value: string | number | readonly string[] | undefined,
): string => {
  if (typeof value === 'string') return value

  if (typeof value === 'number') return value.toString()

  if (Array.isArray(value)) return value.join('')

  return ''
}

export const calculateValueLength = (
  value: string | number | readonly string[] | undefined,
): number => {
  const normalizedValue = normalizeValue(value)
  return normalizedValue.length
}
