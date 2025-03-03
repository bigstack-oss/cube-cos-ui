import pluralize from 'pluralize'

export const toUnitDisplay = (value: number, unit: string) => {
  return `${value} ${pluralize(unit, value)}`
}
