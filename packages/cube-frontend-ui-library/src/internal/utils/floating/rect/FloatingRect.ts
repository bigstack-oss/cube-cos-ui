import { computeIdealPlacement } from '../autoPlacement/computeIdealPlacement'
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
  fitByAutoPlacement: () => this
  fitByTranslate: () => this
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

  private _autoPlacement: boolean = false
  private _translate: boolean = false

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

  fitByAutoPlacement(): this {
    if (this._translate) {
      throw new Error(
        'autoPlacement and translate cannot be used at the same time',
      )
    }
    this._autoPlacement = true
    return this
  }

  fitByTranslate(): this {
    if (this._autoPlacement) {
      throw new Error(
        'translate and autoPlacement cannot be used at the same time',
      )
    }
    this._translate = true
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

    if (this._autoPlacement) {
      const overflowPx = this.computeOverflowPx(floatingBoundary)

      idealPlacement = computeIdealPlacement(
        this._originalPlacement,
        overflowPx,
      )

      if (idealPlacement !== this._originalPlacement) {
        finalBoundary = computeFloatingBoundary(
          this._anchorDomRect,
          this._size,
          idealPlacement,
          this._offsets,
        )
      }
    } else if (this._translate) {
      const overflowPx = this.computeOverflowPx(floatingBoundary)
      translationOffsets = computeTranslate(this._originalPlacement, overflowPx)
    }

    const floatingStyle: FloatingStyle = {
      // Convert the position from viewport-relative coordinates to document-relative coordinates.
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
