import pluralize from 'pluralize'

export const toPluralizeDisplay = (value: number, word: string) => {
  return `${value} ${pluralize(word, value)}`
}
