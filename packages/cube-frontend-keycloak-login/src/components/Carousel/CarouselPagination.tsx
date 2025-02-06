import { cva } from 'class-variance-authority'
import { useMemo } from 'react'

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
    <div className="absolute bottom-[120px] flex w-full items-center justify-center gap-x-4">
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
