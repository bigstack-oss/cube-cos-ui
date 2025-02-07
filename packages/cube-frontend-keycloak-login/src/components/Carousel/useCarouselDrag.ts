import {
  CSSProperties,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export type UseCarouselDrag = {
  isDragging: boolean
  draggableAreaStyle: CSSProperties
  draggableAreaRef: RefObject<HTMLDivElement | null>
  startDrag: (e: ReactMouseEvent | ReactTouchEvent) => void
  endDrag: (e: ReactMouseEvent | ReactTouchEvent) => void
}

export type UseCarouselDragOptions = {
  /**
   * The percentage of width users have to drag to trigger a slide change.
   */
  threshold: number
  onDragStarted?: () => void
  onDragEnded?: () => void
  onDragToPreviousSlide: () => void
  onDragToNextSlide: () => void
}

const getPointerX = (
  e: MouseEvent | ReactMouseEvent | ReactTouchEvent | TouchEvent,
): number => {
  if ('changedTouches' in e) {
    return e.changedTouches[0].pageX
  } else {
    return e.clientX
  }
}

export const useCarouselDrag = (
  options: UseCarouselDragOptions,
): UseCarouselDrag => {
  const {
    threshold,
    onDragStarted,
    onDragEnded,
    onDragToPreviousSlide,
    onDragToNextSlide,
  } = options

  if (threshold <= 0 || threshold > 1) {
    throw new Error('threshold must be between 0 (exclusive) and 1 (inclusive)')
  }

  const [isDragging, setIsDragging] = useState(false)
  // We use an extra ref for `isDragging` because refs are updated synchronously.
  // This ensures the update of `translateX` stops immediately after `endDrag`
  // is called. If we used the `isDragging` state instead, there would be a
  // slight shift when the user drags the image out of the draggable area
  // too quickly, since state updates are not synchronous.
  const isDraggingRef = useRef(false)

  const [translateX, setTranslateX] = useState(0)

  const prevMouseXRef = useRef(0)
  const dragStartXRef = useRef(0)
  const draggableAreaRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const updateDeltaX = (e: MouseEvent | TouchEvent): void => {
      if (isDraggingRef.current) {
        const pointerX = getPointerX(e)
        const deltaX = pointerX - prevMouseXRef.current
        setTranslateX((prev) => prev + deltaX)
        prevMouseXRef.current = pointerX
      }
    }

    window.addEventListener('mousemove', updateDeltaX)
    window.addEventListener('touchmove', updateDeltaX)

    return () => {
      window.removeEventListener('mousemove', updateDeltaX)
      window.removeEventListener('touchmove', updateDeltaX)
    }
  }, [])

  const startDrag = (e: ReactMouseEvent | ReactTouchEvent): void => {
    if (isDragging) {
      return
    }
    const pointerX = getPointerX(e)
    prevMouseXRef.current = pointerX
    dragStartXRef.current = pointerX
    setIsDragging(true)
    isDraggingRef.current = true
    onDragStarted?.()
  }

  const endDrag = (e: ReactMouseEvent | ReactTouchEvent): void => {
    const draggableArea = draggableAreaRef.current

    if (!isDragging || !draggableArea) {
      return
    }

    const { width: draggableAreaWidth } = draggableArea.getBoundingClientRect()

    const pointerX = getPointerX(e)
    const dragDelta = pointerX - dragStartXRef.current
    const dragPercentage = dragDelta / draggableAreaWidth

    if (Math.abs(dragPercentage) >= threshold) {
      if (dragPercentage < 0) {
        // Drag towards left, change to the next slide.
        onDragToNextSlide()
      } else {
        // Drag towards right, change to the previous slide.
        onDragToPreviousSlide()
      }
    }

    setIsDragging(false)
    isDraggingRef.current = false
    setTranslateX(0)

    onDragEnded?.()
  }

  const draggableAreaStyle = useMemo<CSSProperties>(() => {
    return {
      transform: `translateX(${translateX}px)`,
    }
  }, [translateX])

  return {
    isDragging,
    draggableAreaStyle,
    draggableAreaRef,
    startDrag,
    endDrag,
  }
}
