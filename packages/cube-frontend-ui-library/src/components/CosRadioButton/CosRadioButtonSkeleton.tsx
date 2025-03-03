import { CosSkeleton } from '../CosSkeleton/CosSkeleton'

export const CosRadioButtonSkeleton = () => {
  return (
    <div className="inline-flex gap-x-2">
      <CosSkeleton className="size-5" />
      <CosSkeleton className="h-5 w-[152px]" />
    </div>
  )
}
