import { flipPlacementIfNecessary } from '../flip/flipPlacementIfNecessary'
import { computeTranslate } from '../translate/computeTranslate'
import {
  FloatingStyle,
  Offsets,
  Placement,
  Size,
  TranslationOffsets,
  XYBoundary,
} from '../types'
import { computeFloatingBoundary } from './computeFloatingBoundary'

interface IFloatingRect {
  fitByFlip: (boundaryRect: DOMRect) => this
  fitByTranslate: (boundaryRect: DOMRect) => this
  resolveStyles: () => ResolvedFloatingStyles
}

export type ResolvedFloatingStyles = {
  idealPlacement: Placement
  floatingStyle: FloatingStyle
  translationOffsets: TranslationOffsets
}

// TODO: Add unit tests.
export class FloatingRect implements IFloatingRect {
  private readonly _anchorDomRect: DOMRect
  private readonly _size: Size
  private readonly _originalPlacement: Placement
  private readonly _offsets: Offsets | undefined = undefined

  private _flipBoundaryDomRect: DOMRect | undefined = undefined
  private _translateBoundaryDomRect: DOMRect | undefined = undefined

  constructor(
    anchorDomRect: DOMRect,
    size: Size,
    placement: Placement,
    offsets?: Partial<Offsets>,
  ) {
    this._anchorDomRect = anchorDomRect
    this._size = size
    this._originalPlacement = placement
    this._offsets = offsets
  }

  fitByFlip(boundaryDomRect: DOMRect): this {
    if (this._translateBoundaryDomRect) {
      throw new Error('flip and translate cannot be used at the same time')
    }
    this._flipBoundaryDomRect = boundaryDomRect
    return this
  }

  fitByTranslate(boundaryRect: DOMRect): this {
    if (this._flipBoundaryDomRect) {
      throw new Error('translate and flip cannot be used at the same time')
    }
    this._translateBoundaryDomRect = boundaryRect
    return this
  }

  resolveStyles(): ResolvedFloatingStyles {
    const floatingBoundary = computeFloatingBoundary(
      this._anchorDomRect,
      this._size,
      this._originalPlacement,
      this._offsets,
    )

    let idealPlacement = this._originalPlacement
    let finalBoundary: XYBoundary = { ...floatingBoundary }
    let translationOffsets: TranslationOffsets = {
      x: 0,
      y: 0,
    }

    if (this._flipBoundaryDomRect) {
      idealPlacement = this.computeIdealPlacement(
        floatingBoundary,
        this._flipBoundaryDomRect,
      )
      finalBoundary = computeFloatingBoundary(
        this._anchorDomRect,
        this._size,
        idealPlacement,
        this._offsets,
      )
    } else if (this._translateBoundaryDomRect) {
      const overflowPx = this.computeOverflowPx(
        floatingBoundary,
        this._translateBoundaryDomRect,
      )
      translationOffsets = computeTranslate(this._originalPlacement, overflowPx)
    }

    const floatingStyle: FloatingStyle = {
      // Convert relative position to absolute position.
      top: finalBoundary.top + window.scrollY,
      left: finalBoundary.left + window.scrollX,
      transform: `translate(${translationOffsets.x}px, ${translationOffsets.y}px)`,
    }

    return {
      idealPlacement,
      floatingStyle,
      translationOffsets,
    }
  }

  private computeIdealPlacement(
    floatingBoundary: XYBoundary,
    boundaryDomRect: DOMRect,
  ): Placement {
    const overflowPx = this.computeOverflowPx(floatingBoundary, boundaryDomRect)
    const idealPlacement = flipPlacementIfNecessary(
      this._originalPlacement,
      overflowPx,
    )
    return idealPlacement
  }

  private computeOverflowPx(
    floatingBoundary: XYBoundary,
    boundaryDomRect: DOMRect,
  ): XYBoundary {
    return {
      top: boundaryDomRect.top - floatingBoundary.top,
      right: floatingBoundary.right - boundaryDomRect.right,
      bottom: floatingBoundary.bottom - boundaryDomRect.bottom,
      left: boundaryDomRect.left - floatingBoundary.left,
    }
  }
}
