import { CosSkeleton } from '../../CosSkeleton/CosSkeleton'
import { CosTableColumnSkeletonVariant } from './CosTableColumn'

export type CosTableTdSkeletonProps = {
  variant: CosTableColumnSkeletonVariant
}

export const CosTableTdSkeleton = (props: CosTableTdSkeletonProps) => {
  const { variant } = props

  switch (variant) {
    case 'regular':
      return <CosSkeleton className="h-4 w-[120px]" />
    case 'subtext-vertical':
      return (
        <div className="flex w-[120px] flex-col gap-y-[6px]">
          <CosSkeleton className="h-4 w-full" />
          <CosSkeleton className="h-[13px] w-full" />
        </div>
      )
    case 'subtext-horizontal':
      return (
        <div className="flex items-center gap-x-[6px]">
          <CosSkeleton className="h-4 w-[30px]" />
          <CosSkeleton className="h-4 w-[50px]" />
        </div>
      )
    case 'icon-left':
      return (
        <div className="flex items-center gap-x-4">
          <CosSkeleton className="size-4" />
          <CosSkeleton className="h-4 w-[88px]" />
        </div>
      )
    case 'icon-right':
      return (
        <div className="flex items-center gap-x-1">
          <CosSkeleton className="h-4 w-[98px]" />
          <CosSkeleton className="size-4" />
        </div>
      )
    case 'icon-vertical':
      return (
        <div className="flex w-[85px] flex-col gap-y-[6px]">
          <CosSkeleton className="h-4 w-full" />
          <CosSkeleton className="h-[17px] w-full" />
        </div>
      )
    case 'icon-only':
      return <CosSkeleton className="size-4" />
    case 'with-barchart':
      return (
        <div className="flex items-center gap-x-[6px]">
          <CosSkeleton className="h-4 w-[60px]" />
          <CosSkeleton className="h-4 w-[23px]" />
        </div>
      )
    case 'status':
      return <CosSkeleton className="h-[17px] w-[50px]" />
    default:
      throw new Error(`Unhandled CosTableTdSkeleton variant ${variant}`)
  }
}
