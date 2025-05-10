import { cva } from 'class-variance-authority'
import { ClassValue } from 'class-variance-authority/types'
import { MouseEvent, RefObject } from 'react'
import { splitPlacements } from '../../internal/utils/floating/splitPlacements'
import {
  Placement,
  VerticalPlacement,
} from '../../internal/utils/floating/types'
import { useFloating } from '../../internal/utils/floating/useFloating'
import { Caret } from './Caret'
import { CosTooltipInformation } from './types'

export type InfoBoxProps = {
  information: CosTooltipInformation
  placement: Placement
  mouseX: number
  anchorRef: RefObject<HTMLElement | null>
}

const container = cva(
  'pointer-events-none absolute flex min-w-[50px] max-w-[480px]',
  {
    variants: {
      isVisible: {
        false: 'invisible left-[-9999px] top-[-9999px]',
      },
      verticalPlacement: {
        top: 'flex-col',
        bottom: 'flex-col-reverse',
      } satisfies Record<VerticalPlacement, ClassValue>,
    },
  },
)

export const InfoBox = (props: InfoBoxProps) => {
  const {
    information: { title, subtext, message },
    placement,
    mouseX,
    anchorRef,
  } = props

  const { elementRef, resolvedStyles } = useFloating({
    anchorRef,
    placement,
    offsets: {
      x: 14,
      y: 2,
    },
    mouseX,
  })

  const {
    idealPlacement = placement,
    floatingStyle,
    translateX = 0,
  } = resolvedStyles ?? {}

  const [verticalPlacement] = splitPlacements(idealPlacement)

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    // Prevent the visibility state from switching from 'hover' to 'click'
    // when the info box is clicked after the translate is applied.
    e.stopPropagation()
  }

  const renderContent = () => {
    return (
      <div
        className="flex flex-col gap-y-0.5 rounded-[5px] bg-dark-700 px-3 pb-2.5 pt-2"
        onClick={onClick}
      >
        <div className="flex items-center justify-between gap-x-6 text-primary-200">
          <div className="primary-body2 shrink-0 font-semibold">{title}</div>
          <div className="primary-body4 shrink-0">{subtext}</div>
        </div>
        <p className="primary-body3 text-grey-0">{message}</p>
      </div>
    )
  }

  return (
    <>
      {/* Attach `elementRef` to the invisible "shadow" element so we can
      measure its rect accurately without wrapping, which can happen near
      the right edge of the window. */}
      <div
        ref={elementRef}
        className={container({
          isVisible: false,
          verticalPlacement,
        })}
      >
        {renderContent()}
      </div>
      {/* Element that's visible to users. */}
      <div
        className={container({
          isVisible: !!resolvedStyles,
          verticalPlacement,
        })}
        style={floatingStyle}
      >
        {renderContent()}
        <Caret placement={idealPlacement} translateX={translateX} />
      </div>
    </>
  )
}
