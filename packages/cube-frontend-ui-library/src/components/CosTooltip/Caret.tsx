import { cva } from 'class-variance-authority'
import { ClassValue } from 'class-variance-authority/types'
import { CSSProperties, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { splitPlacements } from '../../internal/utils/floating/splitPlacements'
import {
  HorizontalPlacement,
  Placement,
} from '../../internal/utils/floating/types'

export type CaretProps = {
  placement: Placement
  translateX: number
}

const caret = cva(
  'inline-block size-0 border-[6px] border-t-0 border-solid border-transparent border-b-dark-700',
  {
    variants: {
      horizontalPlacement: {
        left: 'ml-4 self-start',
        center: 'self-center',
        right: 'mr-4 self-end',
        'follow-cursor': 'self-center',
      } satisfies Record<HorizontalPlacement, ClassValue>,
    },
  },
)

export const Caret = (props: CaretProps) => {
  const { placement, translateX: translateXProp } = props

  const [verticalPlacement, horizontalPlacement] = splitPlacements(placement)

  // Use inline styles instead of arbitrary Tailwind classes for multiple
  // transform properties, as they are easier to understand in this case.
  const style = useMemo<CSSProperties>(() => {
    // The caret points to the top side by default.
    // For top placement, the caret should point downward.
    const rotateAngle = verticalPlacement === 'top' ? 180 : 0

    let translateX = translateXProp

    if (
      verticalPlacement === 'bottom' &&
      horizontalPlacement === 'follow-cursor' &&
      translateXProp < 0
    ) {
      // Content is overflowing to the right of the boundary.
      translateX = translateXProp * -1
    }

    return {
      transform: `rotate(${rotateAngle}deg) translateX(${translateX}px)`,
    }
  }, [verticalPlacement, horizontalPlacement, translateXProp])

  return (
    <span
      className={twMerge(
        caret({
          horizontalPlacement,
        }),
      )}
      style={style}
    />
  )
}
