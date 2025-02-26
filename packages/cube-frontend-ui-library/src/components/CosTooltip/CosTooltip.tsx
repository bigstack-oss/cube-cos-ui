import {
  Children,
  cloneElement,
  MouseEvent,
  ReactElement,
  Ref,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { Placement } from '../../internal/utils/floating/types'
import { InfoBox } from './InfoBox'
import {
  CosTooltipInformation,
  InteractiveElementProps,
  VisibilityState,
} from './types'

export type CosTooltipProps = {
  /**
   * @default 'top-center'
   */
  placement?: Placement
  hoverContent?: CosTooltipInformation
  clickContent?: CosTooltipInformation
  /**
   * The toggle (anchor) element.
   */
  children: ReactElement<InteractiveElementProps>
}

const assignRefValue = <T,>(ref: Ref<T> | undefined, element: T): void => {
  if (!ref) {
    return
  }

  if (typeof ref === 'function') {
    ref(element)
  } else {
    ref.current = element
  }
}

export const CosTooltip = (props: CosTooltipProps) => {
  const {
    placement = 'top-center',
    hoverContent,
    clickContent,
    children: anchorElement,
  } = props

  const [visibilityState, setVisibilityState] =
    useState<VisibilityState>(undefined)

  const anchorRef = useRef<HTMLElement | null>(null)

  const infoMap: Record<
    NonNullable<VisibilityState>,
    CosTooltipInformation | undefined
  > = {
    hover: hoverContent,
    click: clickContent,
  }

  const onMouseEnter = (e: MouseEvent<HTMLElement>) => {
    if (hoverContent) {
      setVisibilityState('hover')
    }
    anchorElement.props.onMouseEnter?.(e)
  }

  const onMouseLeave = (e: MouseEvent<HTMLElement>) => {
    setVisibilityState(undefined)
    anchorElement.props.onMouseLeave?.(e)
  }

  const onClick = (e: MouseEvent<HTMLElement>) => {
    if (clickContent) {
      setVisibilityState('click')
    }
    anchorElement.props.onClick?.(e)
  }

  Children.only(anchorElement)

  const clonedAnchor = cloneElement(anchorElement, {
    ref: (element: HTMLElement) => {
      const { ref: anchorRefProp } = anchorElement.props
      // Assign the element to the existing `ref` prop on `anchorElement`.
      assignRefValue(anchorRefProp, element)
      // Assign the element to the internal `ref` used in `CosTooltip`.
      anchorRef.current = element
    },
    onMouseEnter,
    onMouseLeave,
    onClick,
  })

  return (
    <>
      {clonedAnchor}
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
    </>
  )
}
