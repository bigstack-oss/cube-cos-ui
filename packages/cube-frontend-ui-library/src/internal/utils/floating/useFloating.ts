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
  offsets?: Offsets
} & (
  | NonNullable<unknown>
  | { autoPlacement: boolean; translate?: never }
  | { autoPlacement?: never; translate: boolean }
)

export const useFloating = <
  Anchor extends HTMLElement = HTMLDivElement,
  Element extends HTMLElement = HTMLDivElement,
>(
  options: UseFloatingOptions<Anchor>,
): UseFloating<Anchor, Element> => {
  const { anchorRef: anchorRefOption, placement, offsets } = options

  const anchorRef = useRef<Anchor>(null)
  const elementRef = useRef<Element>(null)

  const anchorRect = useElementDomRect(
    anchorRefOption?.current ?? anchorRef.current,
  )
  const elementRect = useElementDomRect(elementRef.current)

  const autoPlacement = 'autoPlacement' in options
  const translate = 'translate' in options

  const resolvedStyles = useMemo<ResolvedFloatingStyles | undefined>(() => {
    if (!anchorRect || !elementRect) {
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

    if (autoPlacement) {
      floatingRect.fitByAutoPlacement()
    } else if (translate) {
      floatingRect.fitByTranslate()
    }

    return floatingRect.resolveStyles()
  }, [anchorRect, elementRect, placement, offsets, autoPlacement, translate])

  return {
    anchorRef,
    elementRef,
    resolvedStyles,
  }
}
