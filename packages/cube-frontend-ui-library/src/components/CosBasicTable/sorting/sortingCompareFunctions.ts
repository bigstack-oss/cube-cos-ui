import { CompareFn } from './sortingUtils'

const primitiveTypes = new Set([
  'string',
  'number',
  'bigint',
  'boolean',
  'undefined',
  'null',
])

const defaultAscendingCompare = <T>(
  preceding: T,
  following: T,
  property: string,
): boolean => {
  const type = ensureComparedValueType(preceding, following, property)
  if (type === 'number') {
    return (preceding as number) - (following as number) <= 0
  }
  return String(preceding).localeCompare(String(following)) <= 0
}

const ensureComparedValueType = <T>(
  preceding: T,
  following: T,
  property: string,
): string => {
  if (typeof preceding !== typeof following) {
    throw new Error('Values must have the same type')
  }

  const type = typeof preceding

  if (!primitiveTypes.has(type)) {
    throw new Error(
      `Type ${type} is non-primitive. Please define a custom compare function for ${property}.`,
    )
  }

  return type
}

const defaultDescendingCompare = <T>(
  preceding: T,
  following: T,
  property: string,
): boolean => {
  const type = ensureComparedValueType(preceding, following, property)
  if (type === 'number') {
    return (preceding as number) - (following as number) >= 0
  }
  return String(preceding).localeCompare(String(following)) >= 0
}

export const ascendingCompare = <T>(
  preceding: T,
  following: T,
  property: string,
  customCompareFn: CompareFn<T> | undefined,
): boolean => {
  let isSorted = false

  if (customCompareFn) {
    isSorted = customCompareFn(preceding, following)
  } else {
    isSorted = defaultAscendingCompare(preceding, following, property)
  }

  return isSorted
}

export const descendingCompare = <T>(
  preceding: T,
  following: T,
  property: string,
  customCompareFn: CompareFn<T> | undefined,
): boolean => {
  let isSorted = false

  if (customCompareFn) {
    isSorted = customCompareFn(preceding, following)
  } else {
    isSorted = defaultDescendingCompare(preceding, following, property)
  }

  return isSorted
}
