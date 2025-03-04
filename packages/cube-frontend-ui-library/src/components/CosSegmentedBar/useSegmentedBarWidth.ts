import { throttle } from 'lodash'
import { RefObject, useEffect, useRef, useState } from 'react'

export type UseSegmentedBarWidth = {
  svgRef: RefObject<SVGSVGElement | null>
  barWidth: number
}

export const useSegmentedBarWidth = (
  customWidth: number | undefined,
): UseSegmentedBarWidth => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  const [parentWidth, setParentWidth] = useState(0)

  useEffect(() => {
    const syncParentWidth = (entries: ResizeObserverEntry[]) => {
      setParentWidth(entries[0]?.contentRect.width ?? 0)
    }

    const throttledSync = throttle(syncParentWidth, 50)

    let observer: ResizeObserver | undefined = undefined

    if (customWidth === undefined && svgRef.current?.parentElement) {
      observer = new ResizeObserver(throttledSync)
      observer.observe(svgRef.current.parentElement)
    }

    return () => {
      observer?.disconnect()
    }
  }, [customWidth])

  return {
    svgRef,
    barWidth: customWidth ?? parentWidth,
  }
}
