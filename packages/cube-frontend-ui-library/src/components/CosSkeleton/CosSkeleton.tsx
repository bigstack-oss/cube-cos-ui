import { PropsWithClassName } from '@cube-frontend/utils'
import { twMerge } from 'tailwind-merge'

export type CosSkeletonProps = PropsWithClassName & {
  style?: React.CSSProperties
}

export const CosSkeleton = (props: CosSkeletonProps) => {
  const { className, style } = props

  return (
    <div
      className={twMerge(
        'cos-skeleton animate-cos-skeleton rounded-[5px]',
        className,
      )}
      style={style}
    />
  )
}
