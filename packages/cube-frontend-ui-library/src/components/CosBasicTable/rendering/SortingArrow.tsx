import ArrowDown from '@cube-frontend/ui-library/icons/monochrome/arrow_down.svg?react'
import ArrowsSwitchVertical01 from '@cube-frontend/ui-library/icons/monochrome/arrows_switch_vertical_01.svg?react'
import { cva } from 'class-variance-authority'
import { ClassValue } from 'class-variance-authority/types'
import { twMerge } from 'tailwind-merge'
import { SortDirection } from '../sorting/sortingUtils'

export type SortingArrowProps = {
  direction: SortDirection
  onClick: () => void
}

const arrow = cva(
  [
    'icon-md cursor-pointer',
    'text-functional-text-light hover:text-functional-hover-primary',
  ],
  {
    variants: {
      direction: {
        ascending: 'rotate-180',
        descending: 'rotate-0',
      } satisfies Record<NonNullable<SortDirection>, ClassValue>,
      isSelected: {
        true: 'text-functional-text transition-transform',
      },
    },
  },
)

export const SortingArrow = (props: SortingArrowProps) => {
  const { direction, onClick } = props

  const Icon = !direction ? ArrowsSwitchVertical01 : ArrowDown

  return (
    <Icon
      className={twMerge(
        arrow({
          direction,
          isSelected: !!direction,
        }),
      )}
      onClick={onClick}
    />
  )
}
