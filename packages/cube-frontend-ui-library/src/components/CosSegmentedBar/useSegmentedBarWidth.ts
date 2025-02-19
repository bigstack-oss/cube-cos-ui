import { debounce } from '@cube-frontend/utils'
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
    const syncParentWidth = () => {
      const { width: parentWidth = 0 } =
        svgRef.current?.parentElement?.getBoundingClientRect() ?? {}
      setParentWidth(parentWidth)
    }

    const debouncedSync = debounce(syncParentWidth)

    if (customWidth === undefined) {
      syncParentWidth()
      window.addEventListener('resize', debouncedSync)
    }

    return () => {
      window.removeEventListener('resize', debouncedSync)
    }
  }, [customWidth])

  return {
    svgRef,
    barWidth: customWidth ?? parentWidth,
  }
}
