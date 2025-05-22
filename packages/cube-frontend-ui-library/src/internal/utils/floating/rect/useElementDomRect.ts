import { debounce } from 'lodash'
import { RefObject, useCallback, useEffect, useState } from 'react'

const isRectEqual = (
  rectA: DOMRect | undefined,
  rectB: DOMRect | undefined,
): boolean => {
  if (!rectA && !rectB) return true
  if (!!rectA !== !!rectB) return false

  const keys: (keyof DOMRect)[] = [
    'top',
    'right',
    'bottom',
    'left',
    'width',
    'height',
    'x',
    'y',
  ]
  return keys.every((key) => rectA![key] === rectB![key])
}

export const useElementDomRect = (
  elementRef: RefObject<HTMLElement | null>,
  scrollableRootSelector: string | undefined,
): DOMRect | undefined => {
  const [rect, setRect] = useState<DOMRect | undefined>()

  const getScrollableRoot = useCallback((): Element | typeof window | null => {
    if (scrollableRootSelector) {
      const element = document.querySelector(scrollableRootSelector)
      if (!element) {
        console.warn(
          `Cannot find element with selector ${scrollableRootSelector}`,
        )
      }
      return element
    } else {
      return window
    }
  }, [scrollableRootSelector])

  useEffect(() => {
    const syncRect = () => {
      setRect((prevRect) => {
        const currentRect = elementRef.current?.getBoundingClientRect()
        if (isRectEqual(prevRect, currentRect)) return prevRect
        return currentRect
      })
    }

    const debouncedSync = debounce(syncRect, 100)

    syncRect()

    const scrollableRoot = getScrollableRoot()

    // `getBoundingClientRect` returns a `DOMRect` with the element's size and
    // position relative to the viewport.
    // Therefore, we need to call it again to get the updated rect after
    // scrolling and resizing.
    scrollableRoot?.addEventListener('scroll', debouncedSync)
    scrollableRoot?.addEventListener('resize', debouncedSync)

    // TODO: Find a better way to detect horizontal position change.
    const intervalId = setInterval(() => {
      syncRect()
    }, 250)

    return () => {
      scrollableRoot?.removeEventListener('scroll', debouncedSync)
      scrollableRoot?.removeEventListener('resize', debouncedSync)
      clearInterval(intervalId)
    }
  }, [elementRef, getScrollableRoot])

  return rect
}
