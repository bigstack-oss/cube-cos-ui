import { RefObject, useEffect, useRef, useState } from 'react'

type UseVisibleRowsCount = {
  textareaRef: RefObject<HTMLTextAreaElement | null>
  visibleRowsCount: number
}

export const useVisibleRowsCount = (): UseVisibleRowsCount => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [visibleRowsCount, setVisibleRowsCount] = useState(0)

  /**
   * Calculate visible rows
   * and update `visibleRowsCount` when the textarea resizes.
   */
  useEffect(() => {
    const textarea = textareaRef.current

    let observer: ResizeObserver | undefined = undefined

    if (textarea) {
      observer = new ResizeObserver((entries) => {
        const { lineHeight } = getComputedStyle(textarea)
        const lineHeightPx = parseInt(lineHeight)
        const textareaHeight = entries[0]?.contentBoxSize[0]?.blockSize ?? 0
        setVisibleRowsCount(
          Math.ceil((textareaHeight + textarea.scrollTop) / lineHeightPx),
        )
      })
      observer.observe(textarea)
    }

    return () => {
      observer?.disconnect()
    }
  }, [])

  return {
    textareaRef,
    visibleRowsCount,
  }
}
