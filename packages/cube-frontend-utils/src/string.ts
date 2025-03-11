import pluralize from 'pluralize'

export const toPluralizeDisplay = (value: number, word: string) => {
  return `${value} ${pluralize(word, value)}`
}
export const toUpperCase = (str: string) => str.toUpperCase()

export const toUpperCaseFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)
