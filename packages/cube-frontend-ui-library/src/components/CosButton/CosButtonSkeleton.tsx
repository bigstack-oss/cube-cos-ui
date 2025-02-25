import { CosButtonSize, CosButtonUsage } from './CosButton'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'

export type CosButtonSkeletonProps = {
  /**
   * @default 'md
   */
  size?: CosButtonSize
  /**
   * @default 'text-only'
   */
  usage?: CosButtonUsage
}

const buttonSkeleton = cva(undefined, {
  variants: {
    size: {
      sm: 'h-[26px]',
      md: 'h-[34px]',
      lg: 'h-[42px]',
    },
    usage: {
      'text-only': '',
      'icon-only': '',
      'icon-left': '',
      'icon-right': '',
    },
  },
  compoundVariants: [
    {
      usage: 'text-only',
      size: 'sm',
      className: 'w-[104px]',
    },
    {
      usage: 'text-only',
      size: 'md',
      className: 'w-[118px]',
    },
    {
      usage: 'text-only',
      size: 'lg',
      className: 'w-[126px]',
    },

    {
      usage: 'icon-only',
      size: 'sm',
      className: 'w-[26px]',
    },
    {
      usage: 'icon-only',
      size: 'md',
      className: 'w-[34px]',
    },
    {
      usage: 'icon-only',
      size: 'lg',
      className: 'w-[42px]',
    },

    {
      usage: ['icon-left', 'icon-right'],
      size: 'sm',
      className: 'w-[128px]',
    },
    {
      usage: ['icon-left', 'icon-right'],
      size: 'md',
      className: 'w-[144px]',
    },
    {
      usage: ['icon-left', 'icon-right'],
      size: 'lg',
      className: 'w-[156px]',
    },
  ],
})

export const CosButtonSkeleton = (props: CosButtonSkeletonProps) => {
  const { size = 'md', usage = 'text-only' } = props

  return <CosSkeleton className={twMerge(buttonSkeleton({ size, usage }))} />
}
