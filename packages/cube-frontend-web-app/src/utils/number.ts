export const toPercentage = (used: number, total: number) => {
  if (total === 0) return 0
  return Math.floor((used / total) * 100)
}

export const baseLog = (x: number, y: number) => {
  return Math.log(x) / Math.log(y)
}

// TODO: Add unit tests.
// reference: https://stackoverflow.com/questions/2283566/how-can-i-round-a-number-in-javascript-tofixed-returns-a-string
export function toFixedNumber(num: number, digits: number) {
  const pow = Math.pow(10, digits)
  return Math.round(num * pow) / pow
}

export const toAbbreviation = (num: number) => {
  // SI: prefixes from mega (10^6) up are uppercase; kilo stays lowercase.
  const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E']
  // Values at or below 0.001 give a negative tier, which has no symbol.
  const tier = Math.max(0, (Math.log10(num) / 3) | 0)

  if (tier === 0) return toFixedNumber(num, 2)

  const suffix = SI_SYMBOL[tier]
  const scale = Math.pow(10, tier * 3)

  const scaled = num / scale

  return toFixedNumber(scaled, 2) + suffix
}
