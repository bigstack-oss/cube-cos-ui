import { Ref } from 'react'

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

export const assignRefValue = <T>(
  ref: Ref<T> | undefined,
  element: T,
): void => {
  if (!ref) {
    return
  }

  if (typeof ref === 'function') {
    ref(element)
  } else {
    ref.current = element
  }
}
