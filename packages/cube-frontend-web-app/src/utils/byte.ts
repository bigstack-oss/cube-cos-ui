import { baseLog, toFixedNumber } from './number'

export const sizeUnits = [
  'bytes',
  'KiB',
  'MiB',
  'GiB',
  'TiB',
  'PiB',
  'EiB',
  'ZiB',
  'YiB',
] as const

export type SizeUnit = (typeof sizeUnits)[number]

const K = 1024

// TODO: Add unit tests.
export const getReadableSizeUnit = (
  value: number,
  unit: SizeUnit,
): SizeUnit => {
  const fromIndex = sizeUnits.indexOf(unit)
  const valueInBytes = value * Math.pow(K, fromIndex)
  const displayUnitIndex = Math.floor(baseLog(valueInBytes, K))

  return sizeUnits[displayUnitIndex]
}

// TODO: Add unit tests.
export const convertSize = (
  value: number,
  options: { fromUnit: SizeUnit; toUnit: SizeUnit; decimals?: number },
) => {
  const { fromUnit, toUnit, decimals = 2 } = options

  const fromIndex = sizeUnits.indexOf(fromUnit)
  const toIndex = sizeUnits.indexOf(toUnit)

  return toFixedNumber(value * Math.pow(K, fromIndex - toIndex), decimals)
}

export const toReadableUsedSize = (props: {
  total: number
  used: number
  originalSizeUnit: SizeUnit
}) => {
  const { total, used, originalSizeUnit: originSizeUnit } = props

  const readableSizeUnit = getReadableSizeUnit(total, originSizeUnit)
  const readableTotalValue = convertSize(total, {
    fromUnit: originSizeUnit,
    toUnit: readableSizeUnit,
  })
  const readableUsedValue = convertSize(used, {
    fromUnit: originSizeUnit,
    toUnit: readableSizeUnit,
  })

  return {
    total: readableTotalValue,
    used: readableUsedValue,
    sizeUnit: readableSizeUnit,
  }
}
