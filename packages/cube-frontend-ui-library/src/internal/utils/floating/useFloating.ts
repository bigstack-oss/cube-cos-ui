import { RefObject, useMemo, useRef } from 'react'
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
  /**
   * A controlled anchor reference for cases where the anchor element
   * and the floating element are not in the same hierarchy.
   */
  anchorRef?: RefObject<Anchor | null>
  placement: Placement
  /**
   * The boundary element for the floating element.
   * When `flip` or `translate` is enabled, the floating element will
   * adjust its position to stay within the boundary if it overflows.
   */
  boundaryElement: HTMLElement | null
  offsets?: Offsets
} & (
  | NonNullable<unknown>
  | { flip: boolean; translate?: never }
  | { flip?: never; translate: boolean }
)

export const useFloating = <
  Element extends HTMLElement = HTMLDivElement,
  Anchor extends HTMLElement = HTMLDivElement,
>(
  options: UseFloatingOptions<Anchor>,
): UseFloating<Anchor, Element> => {
  const {
    anchorRef: anchorRefOption,
    placement,
    boundaryElement,
    offsets,
  } = options

  const anchorRef = useRef<Anchor>(null)
  const elementRef = useRef<Element>(null)

  const anchorRect = useElementDomRect(
    anchorRefOption?.current ?? anchorRef.current,
  )
  const elementRect = useElementDomRect(elementRef.current)
  const boundaryRect = useElementDomRect(boundaryElement)

  const flip = 'flip' in options
  const translate = 'translate' in options

  const resolvedStyles = useMemo<ResolvedFloatingStyles | undefined>(() => {
    if (!anchorRect || !elementRect || !boundaryRect) {
      return undefined
    }

    const floatingRect = new FloatingRect(
      anchorRect,
      {
        width: elementRect.width,
        height: elementRect.height,
      },
      placement,
      offsets,
    )

    if (flip) {
      floatingRect.fitByFlip(boundaryRect)
    } else if (translate) {
      floatingRect.fitByTranslate(boundaryRect)
    }

    return floatingRect.resolveStyles()
  }, [
    anchorRect,
    elementRect,
    boundaryRect,
    placement,
    offsets,
    flip,
    translate,
  ])

  return {
    anchorRef,
    elementRef,
    resolvedStyles,
  }
}
