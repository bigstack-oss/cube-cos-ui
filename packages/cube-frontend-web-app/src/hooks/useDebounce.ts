import { useCallback, useEffect, useRef, useState } from 'react'

export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [delay, setDebouncedValue, value])

  const updateDebouncedValue = useCallback(
    (value: T) => {
      setDebouncedValue(value)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    },
    [setDebouncedValue],
  )

  return [debouncedValue, updateDebouncedValue] as const
}
