import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'
import { ContentSwitcherSize, CosContentSwitcherContext } from './utils'
import { ClassValue } from 'class-variance-authority/types'
import { CosSkeleton } from '../../internal/components/CosSkeleton/CosSkeleton'

const contentSwitcherSkeletonContainer = cva(
  [
    'secondary-body2 flex items-center justify-center',
    'border-y border-functional-skeleton font-medium text-functional-text-light transition',
    'first-of-type:rounded-l-[5px] first-of-type:border-l',
    'last-of-type:rounded-r-[5px] last-of-type:border-r',
  ],
  {
    variants: {
      size: {
        sm: 'h-[24px] w-[64px]',
        md: 'h-[32px] w-[100px]',
      } satisfies Record<ContentSwitcherSize, ClassValue>,
    },
  },
)

const contentSwitcherSkeleton = cva(null, {
  variants: {
    size: {
      sm: 'h-[13px] w-[39px]',
      md: 'h-[17px] w-[60px]',
    } satisfies Record<ContentSwitcherSize, ClassValue>,
  },
})

export const CosContentSwitcherSkeleton = () => {
  const size = useContext(CosContentSwitcherContext)
  const className = twMerge(contentSwitcherSkeletonContainer({ size }))

  return (
    <div className={className}>
      <CosSkeleton className={twMerge(contentSwitcherSkeleton({ size }))} />
    </div>
  )
}
