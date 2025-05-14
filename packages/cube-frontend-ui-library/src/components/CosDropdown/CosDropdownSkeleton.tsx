import { PropsWithClassName } from '@cube-frontend/utils'
import { twMerge } from 'tailwind-merge'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { CosDropdownSize } from './cosDropdownTypes'
import { skeleton } from './cosDropdownStyles'

type CosDropdownSkeletonProps = PropsWithClassName & {
  size: CosDropdownSize
  hasLabel: boolean
}

export const CosDropdownSkeleton = (props: CosDropdownSkeletonProps) => {
  const { className, size, hasLabel } = props

  const renderLabelSkeleton = () => {
    return hasLabel ? <CosSkeleton className="h-[18px] w-full" /> : null
  }

  return (
    <div className={twMerge(skeleton.container({ size }), className)}>
      {renderLabelSkeleton()}
      <CosSkeleton className={twMerge(skeleton.input({ size }))} />
    </div>
  )
}
