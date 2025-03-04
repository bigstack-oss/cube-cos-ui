import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'
import { ContentSwitcherSize, CosContentSwitcherContext } from './utils'
import { ClassValue } from 'class-variance-authority/types'
import { CosSkeleton } from '../../internal/components/CosSkeleton/CosSkeleton'

const contentSwitcherSkeletonContainer = cva(
  ['flex items-center justify-center', 'border-y border-functional-skeleton'],
  {
    variants: {
      variant: {
        default:
          'first-of-type:rounded-l-[5px] first-of-type:border-l last-of-type:rounded-r-[5px] last-of-type:border-r',
        radius:
          'first-of-type:rounded-l-full first-of-type:border-l last-of-type:rounded-r-full last-of-type:border-r',
      },
      size: {
        sm: '',
        md: '',
      } satisfies Record<ContentSwitcherSize, ClassValue>,
    },
    compoundVariants: [
      { variant: 'default', size: 'md', class: 'h-[32px] w-[100px]' },
      { variant: 'default', size: 'sm', class: 'h-[24px] w-[64px]' },
      { variant: 'radius', class: 'h-[34px] w-[100px]' },
    ],
  },
)

const contentSwitcherSkeleton = cva(null, {
  variants: {
    variant: {
      default: '',
      radius: '',
    },
    size: {
      sm: '',
      md: '',
    } satisfies Record<ContentSwitcherSize, ClassValue>,
  },
  compoundVariants: [
    { variant: 'default', size: 'md', class: 'h-[17px] w-[60px]' },
    { variant: 'default', size: 'sm', class: 'h-[13px] w-[39px]' },
    { variant: 'radius', class: 'h-[17px] w-[50px]' },
  ],
})

export const CosContentSwitcherSkeleton = () => {
  const { size, variant } = useContext(CosContentSwitcherContext)
  const className = twMerge(contentSwitcherSkeletonContainer({ variant, size }))

  return (
    <div className={className}>
      <CosSkeleton
        className={twMerge(contentSwitcherSkeleton({ variant, size }))}
      />
    </div>
  )
}
