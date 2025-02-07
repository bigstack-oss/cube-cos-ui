import { cva } from 'class-variance-authority'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

export type CarouselPaginationProps = {
  itemCount: number
  activeIndex: number
  onIndicatorClick: (index: number) => void
}

const dot = cva(
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
  const { itemCount, activeIndex, onIndicatorClick } = props

  const array = useMemo<number[]>(
    () => Array.from(Array(itemCount).keys()).map((_, index) => index),
    [itemCount],
  )

  return (
    <div
      className={twMerge(
        'absolute bottom-[40px] flex w-full items-center justify-center gap-x-4',
        'height-sm:bottom-[70px]',
        'height-md:bottom-[80px]',
        'height-lg:bottom-[110px]',
        'height-xl:bottom-[120px]',
      )}
    >
      {array.map((index) => (
        <span
          key={index}
          className={dot({
            isActive: index === activeIndex % itemCount,
          })}
          onClick={() => onIndicatorClick(index)}
        />
      ))}
    </div>
  )
}
