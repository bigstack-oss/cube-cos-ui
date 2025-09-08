import { useEffect, useRef, useState } from 'react'

const BREAKPOINT_MINIMAL = 798

type UsePaginationSize = {
  containerRef: React.RefObject<HTMLDivElement | null>
  isMinimal: boolean
}

export const usePaginationSize = (): UsePaginationSize => {
  const observerRef = useRef<ResizeObserver | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [width, setWidth] = useState<number | null>(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    setWidth(node.getBoundingClientRect().width)

    observerRef.current = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })
    observerRef.current.observe(node)

    return () => {
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [])

  return {
    containerRef,
    isMinimal: width !== null ? width < BREAKPOINT_MINIMAL : false,
  }
}
