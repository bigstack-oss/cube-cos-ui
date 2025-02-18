import { debounce } from '@cube-frontend/utils'
import { useEffect, useState } from 'react'

export const useElementDomRect = (
  element: HTMLElement | null,
): DOMRect | undefined => {
  const [rect, setRect] = useState<DOMRect | undefined>()

  useEffect(() => {
    const syncRect = () => {
      setRect(element?.getBoundingClientRect())
    }

    const debouncedSync = debounce(syncRect, 100)

    syncRect()

    // `getBoundingClientRect` returns a `DOMRect` with the element's size and
    // position relative to the viewport.
    // Therefore, we need to call it again to get the updated rect after
    // scrolling and resizing.
    window.addEventListener('scroll', debouncedSync)
    window.addEventListener('resize', debouncedSync)

    return () => {
      window.removeEventListener('scroll', debouncedSync)
      window.removeEventListener('resize', debouncedSync)
    }
  }, [element])

  return rect
}
