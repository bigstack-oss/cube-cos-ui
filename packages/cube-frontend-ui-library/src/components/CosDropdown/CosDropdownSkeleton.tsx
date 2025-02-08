import { twMerge } from 'tailwind-merge'
import { CosSkeleton } from '../../internal/components/CosSkeleton/CosSkeleton'
import { CosDropdownVariant } from './utils'
import { skeleton } from './styles'

type DropdownInputSkeletonProps = { variant: CosDropdownVariant }

type CosDropdownSkeletonProps = {
  variant?: CosDropdownVariant
  hasLabel?: boolean
}

const DropdownLabelSkeleton = () => <CosSkeleton className="h-[18px] w-full" />

const DropdownInputSkeleton = (props: DropdownInputSkeletonProps) => {
  const { variant } = props
  return <CosSkeleton className={twMerge(skeleton.input({ variant }))} />
}

export const CosDropdownSkeleton = (props: CosDropdownSkeletonProps) => {
  const { variant = 'default', hasLabel = false } = props

  return (
    <div className={twMerge(skeleton.container({ variant }))}>
      {hasLabel && <DropdownLabelSkeleton />}
      <DropdownInputSkeleton variant={variant} />
    </div>
  )
}
