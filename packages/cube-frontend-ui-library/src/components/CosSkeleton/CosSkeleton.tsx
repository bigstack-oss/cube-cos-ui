import { PropsWithClassName } from '@cube-frontend/utils'
import { twMerge } from 'tailwind-merge'

export type CosSkeletonProps = PropsWithClassName

export const CosSkeleton = (props: CosSkeletonProps) => {
  const { className } = props

  return (
    <div
      className={twMerge(
        'cos-skeleton animate-cos-skeleton rounded-[5px]',
        className,
      )}
    />
  )
}
