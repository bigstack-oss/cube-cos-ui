export const toPercentage = (used: number, total: number) => {
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

// TODO: Add unit tests.
export const toAbbreviation = (num: number) => {
  const SI_SYMBOL = ['', 'k', 'm', 'g', 't', 'p', 'e']
  const tier = (Math.log10(num) / 3) | 0

  if (tier === 0) return toFixedNumber(num, 2)

  const suffix = SI_SYMBOL[tier]
  const scale = Math.pow(10, tier * 3)

  const scaled = num / scale

  return toFixedNumber(scaled, 2) + suffix
}
