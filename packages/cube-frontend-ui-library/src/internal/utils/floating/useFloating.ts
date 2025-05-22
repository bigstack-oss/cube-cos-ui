import { RefObject, useContext, useMemo, useRef } from 'react'
import { UseFloatingExternalContext } from './externalContext'
import { FloatingRect, ResolvedFloatingStyles } from './rect/FloatingRect'
import { useElementDomRect } from './rect/useElementDomRect'
import { Offsets, Placement } from './types'

export type UseFloating<
  Anchor extends HTMLElement,
  Element extends HTMLElement,
> = {
  anchorRef: RefObject<Anchor | null>
  elementRef: RefObject<Element | null>
  resolvedStyles: ResolvedFloatingStyles | undefined
}

export type UseFloatingOptions<Anchor extends HTMLElement> = {
  isOpen: boolean
  /**
   * A controlled anchor reference for cases where the anchor element
   * and the floating element are not in the same hierarchy.
   */
  anchorRef?: RefObject<Anchor | null>
  placement: Placement
  offsets?: Offsets
  /**
   * Used to calculate the X-position of the floating element when
   * horizontal placement is set to `follow-cursor`.
   * @default 0
   */
  mouseX?: number
}

const createInvisibleFloatingStyles = (
  originalPlacement: Placement,
): ResolvedFloatingStyles => ({
  idealPlacement: originalPlacement,
  floatingStyle: {
    position: 'absolute',
    visibility: 'hidden',
    top: '-9999px',
    left: '-9999px',
  },
  translateX: 0,
})

export const useFloating = <
  Anchor extends HTMLElement = HTMLDivElement,
  Element extends HTMLElement = HTMLDivElement,
>(
  options: UseFloatingOptions<Anchor>,
): UseFloating<Anchor, Element> => {
  const {
    isOpen,
    anchorRef: anchorRefOption,
    placement,
    offsets,
    mouseX = 0,
  } = options

  const anchorRef = useRef<Anchor>(null)
  const elementRef = useRef<Element>(null)

  const { scrollableRootSelector } = useContext(UseFloatingExternalContext)

  const anchorRect = useElementDomRect(
    anchorRefOption ?? anchorRef,
    scrollableRootSelector,
  )
  const elementRect = useElementDomRect(elementRef, scrollableRootSelector)

  const resolvedStyles = useMemo<ResolvedFloatingStyles | undefined>(() => {
    if (!anchorRect || !elementRect) return undefined

    if (!isOpen) return createInvisibleFloatingStyles(placement)

    const floatingRect = new FloatingRect({
      anchorDomRect: anchorRect,
      size: {
        width: elementRect.width,
        height: elementRect.height,
      },
      placement,
      offsets,
      mouseX,
    })

    return floatingRect.resolveStyles()
  }, [isOpen, anchorRect, elementRect, placement, offsets, mouseX])

  return {
    anchorRef,
    elementRef,
    resolvedStyles,
  }
}
