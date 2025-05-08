import { CSSProperties, useMemo } from 'react'
import { VerticalPlacement } from '../../internal/utils/floating/types'

export const useCaretStyle = (
  verticalPlacement: VerticalPlacement,
  translateX: number,
): CSSProperties => {
  // Use inline styles instead of arbitrary Tailwind classes for multiple
  // transform properties, as they are easier to understand in this case.
  const style = useMemo<CSSProperties>(() => {
    // The caret points to the top side by default.
    // For top placement, the caret should point downward.
    const rotateAngle = verticalPlacement === 'top' ? 180 : 0

    return {
      transform: `rotate(${rotateAngle}deg) translateX(${translateX}px)`,
    }
  }, [verticalPlacement, translateX])

  return style
}
