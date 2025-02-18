import { PropsWithClassName } from '@cube-frontend/utils'
import { ReactNode, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { Placement } from '../../internal/utils/floating/types'
import { InfoBox } from './InfoBox'
import {
  CosTooltipInformation,
  VisibilityState,
  WithClickContent,
  WithHoverContent,
} from './types'

export type CosTooltipProps = PropsWithClassName & {
  /**
   * @default 'top-center'
   */
  placement?: Placement
  /**
   * The toggle (anchor) element.
   */
  children: ReactNode
} & (
    | WithHoverContent
    | WithClickContent
    | (WithHoverContent & WithClickContent)
  )

export const CosTooltip = (props: CosTooltipProps) => {
  const { className, placement = 'top-center', children: anchorElement } = props

  const hasHoverContent = 'hoverContent' in props
  const hasClickContent = 'clickContent' in props

  const [visibilityState, setVisibilityState] =
    useState<VisibilityState>(undefined)

  const anchorRef = useRef<HTMLDivElement | null>(null)

  const infoMap: Record<
    NonNullable<VisibilityState>,
    CosTooltipInformation | undefined
  > = {
    hover: hasHoverContent ? props.hoverContent : undefined,
    click: hasClickContent ? props.clickContent : undefined,
  }

  const onMouseEnter = () => {
    if (hasHoverContent) {
      setVisibilityState('hover')
    }
  }

  const onMouseLeave = () => {
    setVisibilityState(undefined)
  }

  const onClick = () => {
    if (hasClickContent) {
      setVisibilityState('click')
    }
  }

  return (
    <div
      ref={anchorRef}
      className={twMerge('inline-flex', className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {anchorElement}
      {visibilityState !== undefined &&
        createPortal(
          <InfoBox
            // Assign a key to remount the InfoBox to prevent layout shifts
            // when switching from hover content to click content.
            key={visibilityState}
            information={infoMap[visibilityState]!}
            placement={placement}
            anchorRef={anchorRef}
          />,
          document.body,
        )}
    </div>
  )
}
