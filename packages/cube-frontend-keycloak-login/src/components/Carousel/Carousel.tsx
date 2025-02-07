import { CSSProperties, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { CarouselPagination } from './CarouselPagination'
import { CarouselSlide } from './CarouselSlide'
import { useCarouselAutoPlay } from './useCarouselAutoPlay'
import { useCarouselDrag } from './useCarouselDrag'
import { useCarouselSlideIndex } from './useCarouselSlideIndex'

export type CarouselProps = {
  assets: Asset[]
}

export type Asset = {
  src: string
  alt: string
}

export const Carousel = (props: CarouselProps) => {
  const { assets } = props

  if (!assets.length) {
    throw new Error('Carousel assets cannot be empty')
  }

  const hasBufferSlides = assets.length > 1
  const lastAsset = useMemo<Asset>(() => assets.slice(-1)[0], [assets])
  const firstAsset = useMemo<Asset>(() => assets[0], [assets])

  const {
    currentSlideIndex,
    isChangingSlide,
    isResettingSlideIndex,
    changeSlide,
  } = useCarouselSlideIndex({
    assetsLength: assets.length,
  })

  const translateStyle = useMemo<CSSProperties>(() => {
    // +1 because of the leading buffer slide.
    const offset = hasBufferSlides ? 1 : 0
    return {
      transform: `translateX(${-100 * (currentSlideIndex + offset)}%)`,
    }
  }, [currentSlideIndex, hasBufferSlides])

  const onDragToPreviousSlide = (): void => {
    // Only allow slide changes on drag if there's more than 1 asset.
    if (hasBufferSlides) {
      changeSlide(currentSlideIndex - 1)
    }
  }

  const onDragToNextSlide = (): void => {
    // Only allow slide changes on drag if there's more than 1 asset.
    if (hasBufferSlides) {
      changeSlide(currentSlideIndex + 1)
    }
  }

  const { startAutoPlay, stopAutoPlay } = useCarouselAutoPlay({
    interval: 5000,
    onIntervalReached: onDragToNextSlide,
  })

  const {
    isDragging,
    draggableAreaRef,
    draggableAreaStyle,
    startDrag,
    endDrag,
  } = useCarouselDrag({
    threshold: 0.2,
    onDragStarted: stopAutoPlay,
    onDragEnded: startAutoPlay,
    onDragToPreviousSlide,
    onDragToNextSlide,
  })

  const onIndicatorClick = (index: number) => {
    if (currentSlideIndex !== index && !isDragging && !isResettingSlideIndex) {
      stopAutoPlay()
      changeSlide(index)
      startAutoPlay()
    }
  }

  return (
    <div className="relative flex h-full w-1/2 items-center overflow-hidden bg-primary">
      {/* Element for overall translation. */}
      <div
        className={twMerge(
          'flex h-full',
          // Disable CSS transition when resetting `currentSlideIndex` to prevent flickering.
          !isResettingSlideIndex && 'transition-transform duration-500',
        )}
        style={translateStyle}
      >
        {/* Element for dragged translation. */}
        <div
          ref={draggableAreaRef}
          className={twMerge(
            'flex h-full select-none',
            // Disable CSS transition when dragging.
            !isDragging && 'transition-transform duration-500',
            // Disable dragging when the carousel is changing slide to prevent
            // flickering.
            isChangingSlide && 'pointer-events-none',
          )}
          style={draggableAreaStyle}
          // Mouse events
          onMouseDown={startDrag}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          // Touch events
          onTouchStart={startDrag}
          onTouchEnd={endDrag}
          onTouchCancel={endDrag}
        >
          {/* Leading buffer slide for infinite carousel. */}
          {hasBufferSlides && <CarouselSlide asset={lastAsset} />}
          {/* Regular slides. */}
          {assets.map((asset, index) => (
            <CarouselSlide key={index} asset={asset} />
          ))}
          {/* Trailing buffer slide for infinite carousel. */}
          {hasBufferSlides && <CarouselSlide asset={firstAsset} />}
        </div>
      </div>
      <CarouselPagination
        currentSlideIndex={currentSlideIndex}
        assetsLength={assets.length}
        onIndicatorClick={onIndicatorClick}
      />
    </div>
  )
}
