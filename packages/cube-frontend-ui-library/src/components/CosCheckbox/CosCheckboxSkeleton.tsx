import { CosSkeleton } from '../../internal/components/CosSkeleton/CosSkeleton'

export const CosCheckboxSkeleton = () => {
  return (
    <div className="inline-flex gap-x-2">
      <CosSkeleton className="size-5" />
      <CosSkeleton className="h-5 w-[152px]" />
    </div>
  )
}
