import { CosSkeleton } from '../CosSkeleton/CosSkeleton'

export const CosTextAreaSkeleton = () => (
  <div className="flex flex-col gap-[6px]">
    <CosSkeleton className="h-[20px] w-full" />
    <CosSkeleton className="h-[140px] w-full" />
  </div>
)
