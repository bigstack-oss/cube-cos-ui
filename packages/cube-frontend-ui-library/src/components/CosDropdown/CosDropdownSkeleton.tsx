import { PropsWithClassName } from '@cube-frontend/utils'
import { twMerge } from 'tailwind-merge'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { CosDropdownVariant } from './utils'
import { skeleton } from './styles'

type DropdownInputSkeletonProps = { variant: CosDropdownVariant }

type CosDropdownSkeletonProps = PropsWithClassName & {
  variant?: CosDropdownVariant
  hasLabel?: boolean
}

const DropdownLabelSkeleton = () => <CosSkeleton className="h-[18px] w-full" />

const DropdownInputSkeleton = (props: DropdownInputSkeletonProps) => {
  const { variant } = props
  return <CosSkeleton className={twMerge(skeleton.input({ variant }))} />
}

export const CosDropdownSkeleton = (props: CosDropdownSkeletonProps) => {
  const { className, variant = 'default', hasLabel = false } = props

  return (
    <div className={twMerge(skeleton.container({ variant }), className)}>
      {hasLabel && <DropdownLabelSkeleton />}
      <DropdownInputSkeleton variant={variant} />
    </div>
  )
}
