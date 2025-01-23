import { CSSProperties, useMemo } from 'react'
import {
  TranslationOffsets,
  VerticalPlacement,
} from '../../internal/utils/floating/types'

export const useCaretStyle = (
  verticalPlacement: VerticalPlacement,
  translationOffsets: TranslationOffsets | undefined,
): CSSProperties => {
  // Use inline styles instead of arbitrary Tailwind classes for multiple
  // transform properties, as they are easier to understand in this case.
  const style = useMemo<CSSProperties>(() => {
    const { x: translateX = 0, y: translateY = 0 } = translationOffsets ?? {}

    // The caret points to the top side by default.
    // For top placement, the caret should point downward.
    const rotateAngle = verticalPlacement === 'top' ? 180 : 0

    // Hide the caret when the floating element is vertically translated
    // to avoid confusion.
    const visibility = translateY !== 0 ? 'hidden' : undefined

    return {
      transform: `rotate(${rotateAngle}deg) translateX(${translateX}px)`,
      visibility,
    }
  }, [verticalPlacement, translationOffsets])

  return style
}
