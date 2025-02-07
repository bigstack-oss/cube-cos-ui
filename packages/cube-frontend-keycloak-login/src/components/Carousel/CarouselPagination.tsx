import { cva } from 'class-variance-authority'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { slideIndexToAssetIndex } from './slideIndexToAssetIndex'

export type CarouselPaginationProps = {
  currentSlideIndex: number
  assetsLength: number
  onIndicatorClick: (index: number) => void
}

const indicator = cva(
  'size-2.5 cursor-pointer rounded-full bg-functional-disable-light',
  {
    variants: {
      isActive: {
        false: 'opacity-30',
      },
    },
  },
)

export const CarouselPagination = (props: CarouselPaginationProps) => {
  const { currentSlideIndex, assetsLength, onIndicatorClick } = props

  const indexes = useMemo<number[]>(() => {
    return Array.from(Array(assetsLength).keys()).map((_, index) => index)
  }, [assetsLength])

  const currentAssetIndex = useMemo<number>(() => {
    return slideIndexToAssetIndex(currentSlideIndex, assetsLength)
  }, [currentSlideIndex, assetsLength])

  return (
    <div
      className={twMerge(
        'absolute bottom-[40px] flex w-full select-none items-center justify-center gap-x-4',
        'height-sm:bottom-[70px]',
        'height-md:bottom-[80px]',
        'height-lg:bottom-[110px]',
        'height-xl:bottom-[120px]',
      )}
    >
      {indexes.map((indicatorIndex) => (
        <span
          key={indicatorIndex}
          className={indicator({
            isActive: indicatorIndex === currentAssetIndex,
          })}
          onClick={() => onIndicatorClick(indicatorIndex)}
        />
      ))}
    </div>
  )
}
