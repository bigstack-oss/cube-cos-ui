import { CosSkeleton } from '@cube-frontend/ui-library'

export const RankingItemSkeleton = () => {
  return (
    <div className="flex h-[36px] w-full items-center gap-x-2">
      <CosSkeleton className="h-[18px] w-[140px]" />
      <div className="flex flex-1 items-center gap-x-1.5">
        <CosSkeleton className="h-[15px] w-[44px]" />
        <CosSkeleton className="h-[3px] flex-1" />
      </div>
    </div>
  )
}
