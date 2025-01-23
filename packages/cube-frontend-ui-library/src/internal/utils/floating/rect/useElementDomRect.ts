import { useEffect, useState } from 'react'

export const useElementDomRect = (
  element: HTMLElement | null,
): DOMRect | undefined => {
  const [rect, setRect] = useState<DOMRect | undefined>()

  useEffect(() => {
    if (element === document.body) {
      // TODO: When the boundary element is `document.body`, we need to use the
      // viewport's rect with the current implementation. This is quite
      // confusing, so this must be refactored in the future!
      setRect(new DOMRect(0, 0, window.innerWidth, window.innerHeight))
    } else {
      setRect(element?.getBoundingClientRect())
    }
  }, [element])

  return rect
}
