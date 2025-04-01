import { Ref, RefObject, useEffect, useRef } from 'react'

export const useSyncedRef = <T>(value: T): RefObject<T> => {
  const ref = useRef<T>(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
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
