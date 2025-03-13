import { PropsWithClassName } from '@cube-frontend/utils'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { twMerge } from 'tailwind-merge'

export const CosProgressBarSkeleton = (props: PropsWithClassName) => {
  const { className: classNameProps } = props

  const className = twMerge('flex w-full items-center gap-x-2', classNameProps)

  return (
    <div className={className}>
      <CosSkeleton className="h-[9px] w-full" />
      <CosSkeleton className="h-[15px] w-[23px]" />
    </div>
  )
}
