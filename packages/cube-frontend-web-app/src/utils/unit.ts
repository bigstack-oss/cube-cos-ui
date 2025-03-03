export const unitAbbreviations = {
  milliseconds: 'ms',
  seconds: 's',
  percentage: '%',
} as const

export const toUnitAbbreviation = (unit: string) => {
  return unitAbbreviations[unit as keyof typeof unitAbbreviations] ?? unit
}

export const toUnitDisplay = (unit: string, unitSuffix = '') => {
  const unitAbbreviation = toUnitAbbreviation(unit)

  return `${unitAbbreviation}${unitSuffix}`
}
