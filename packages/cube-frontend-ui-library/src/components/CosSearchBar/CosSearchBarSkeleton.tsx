import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'

const skeleton = cva('h-[34px] w-full', {
  variants: {
    variant: {
      global: 'rounded-full',
      filter: 'rounded-[5px]',
    },
  },
})

type CosSearchBarSkeletonProps = {
  variant: 'global' | 'filter'
}

export const CosSearchBarSkeleton = (props: CosSearchBarSkeletonProps) => {
  const { variant } = props
  return <CosSkeleton className={twMerge(skeleton({ variant }))} />
}
