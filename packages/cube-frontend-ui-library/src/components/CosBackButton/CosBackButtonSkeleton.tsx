import { CosSkeleton } from '../../internal/components/CosSkeleton/CosSkeleton'

export type CosBackButtonSkeleton = {
  hasDetails?: boolean
}

export const CosBackButtonSkeleton = (props: CosBackButtonSkeleton) => {
  const { hasDetails = false } = props

  return (
    <div className="inline-flex items-center gap-x-3">
      <CosSkeleton className="size-[18px]" />
      <CosSkeleton className="h-5 w-[104px]" />
      {hasDetails && <CosSkeleton className="h-5 w-[77px]" />}
    </div>
  )
}
