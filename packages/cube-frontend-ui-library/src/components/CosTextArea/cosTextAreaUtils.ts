import { Ref } from 'react'

export const normalizeValue = (
  value: string | number | readonly string[] | undefined,
): string => {
  if (typeof value === 'string') return value

  if (typeof value === 'number') return value.toString()

  if (Array.isArray(value)) return value.join('')

  return ''
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
