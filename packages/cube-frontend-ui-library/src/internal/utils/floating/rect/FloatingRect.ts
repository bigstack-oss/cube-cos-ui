import { computeIdealPlacement } from '../autoPlacement/computeIdealPlacement'
import { FloatingStyle, Offsets, Placement, Size, XYBoundary } from '../types'
import { computeFloatingBoundary } from './computeFloatingBoundary'
import { computeTranslateX } from './computeTranslateX'

interface IFloatingRect {
  resolveStyles: () => ResolvedFloatingStyles
}

export type ResolvedFloatingStyles = {
  idealPlacement: Placement
  floatingStyle: FloatingStyle
  translateX: number
}

// TODO: Add unit tests.
export class FloatingRect implements IFloatingRect {
  private readonly _anchorDomRect: DOMRect
  private readonly _size: Size
  private readonly _originalPlacement: Placement
  private readonly _offsets: Offsets | undefined = undefined
  private readonly _mouseX: number = 0

  constructor(
    anchorDomRect: DOMRect,
    size: Size,
    placement: Placement,
    offsets?: Partial<Offsets>,
    mouseX?: number,
  ) {
    this._anchorDomRect = anchorDomRect
    this._size = size
    this._originalPlacement = placement
    this._offsets = offsets
    this._mouseX = mouseX ?? 0
  }

  resolveStyles(): ResolvedFloatingStyles {
    const floatingBoundary = computeFloatingBoundary(
      this._anchorDomRect,
      this._size,
      this._originalPlacement,
      this._offsets,
      this._mouseX,
    )

    let finalBoundary: XYBoundary = { ...floatingBoundary }

    const overflowPx = this.computeOverflowPx(floatingBoundary)

    const idealPlacement = computeIdealPlacement(
      this._originalPlacement,
      overflowPx,
    )

    if (idealPlacement !== this._originalPlacement) {
      finalBoundary = computeFloatingBoundary(
        this._anchorDomRect,
        this._size,
        idealPlacement,
        this._offsets,
        this._mouseX,
      )
    }

    const translateX = computeTranslateX(idealPlacement, overflowPx)

    const floatingStyle: FloatingStyle = {
      // Convert the position from viewport-relative coordinates to document-relative coordinates.
      top: finalBoundary.top + window.scrollY,
      left: finalBoundary.left + window.scrollX,
      transform: `translateX(${translateX}px)`,
    }

    return {
      idealPlacement,
      floatingStyle,
      translateX,
    }
  }

  private computeOverflowPx(floatingBoundary: XYBoundary): XYBoundary {
    const { top, left } = floatingBoundary
    const { innerWidth, innerHeight } = window
    return {
      top: top < 0 ? Math.abs(top) : 0,
      right: Math.max(floatingBoundary.right - innerWidth, 0),
      bottom: Math.max(floatingBoundary.bottom - innerHeight, 0),
      left: left < 0 ? Math.abs(left) : 0,
    }
  }
}
