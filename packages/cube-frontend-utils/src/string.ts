import pluralize from 'pluralize'

export const toUnitDisplay = (value: number, unit: string) => {
  return `${value} ${pluralize(unit, value)}`
}
export const toUpperCase = (str: string) => str.toUpperCase()

export const toUpperCaseFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)
