import { useState } from 'react'
import { flushSync } from 'react-dom'
import { slideIndexToAssetIndex } from './slideIndexToAssetIndex'

export type UseCarouselSlideIndex = {
  currentSlideIndex: number
  isChangingSlide: boolean
  isResettingSlideIndex: boolean
  changeSlide: (index: number) => void
}

export type UseCarouselSlideIndexOptions = {
  assetsLength: number
}

// This value must align with the transition duration of the carousel.
const SLIDE_TRANSITION_DURATION = 500

export const useCarouselSlideIndex = (
  options: UseCarouselSlideIndexOptions,
): UseCarouselSlideIndex => {
  const { assetsLength } = options

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isChangingSlide, setIsChangingSlide] = useState(false)
  const [isResettingSlideIndex, setIsResettingSlideIndex] = useState(false)

  const changeSlide = (index: number): void => {
    setIsChangingSlide(true)
    setCurrentSlideIndex(index)

    const hasReachedBufferSlide =
      index < 0 || (assetsLength > 1 && index === assetsLength)

    // We use CSS translation for the carousel slide animation.
    // To prevent seeing flickering from interrupted transitions, we must wait
    // for the animation to finish before allowing users to change slides again.
    setTimeout(() => {
      if (hasReachedBufferSlide) {
        // Use `flushSync` with `requestAnimationFrame` to ensure CSS transition
        // is disabled & re-enabled in separate frames.
        flushSync(() => {
          // Reset the slide index with CSS transition disabled to prevent flickering.
          const assetIndex = slideIndexToAssetIndex(index, assetsLength)
          setIsResettingSlideIndex(true)
          setCurrentSlideIndex(assetIndex)
        })

        // Wait for the browser to process the DOM update, then re-enable CSS transition.
        requestAnimationFrame(() => {
          setIsResettingSlideIndex(false)
          setIsChangingSlide(false)
        })
      } else {
        // The carousel has reached a regular slide.
        // Simply update `isChangingSlide` without doing anything else.
        setIsChangingSlide(false)
      }
    }, SLIDE_TRANSITION_DURATION)
  }

  return {
    currentSlideIndex,
    isChangingSlide,
    isResettingSlideIndex,
    changeSlide,
  }
}
