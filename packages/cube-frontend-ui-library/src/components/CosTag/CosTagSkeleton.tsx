import { cva } from 'class-variance-authority'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { twMerge } from 'tailwind-merge'

const style = cva('h-[23px] rounded-full', {
  variants: {
    hasIcon: {
      true: 'w-[95px]',
      false: 'w-[80px]',
    },
  },
})

type CosTagSkeletonProps = {
  hasIcon: boolean
}

export const CosTagSkeleton = (props: CosTagSkeletonProps) => {
  const { hasIcon } = props
  return <CosSkeleton className={twMerge(style({ hasIcon }))} />
}
