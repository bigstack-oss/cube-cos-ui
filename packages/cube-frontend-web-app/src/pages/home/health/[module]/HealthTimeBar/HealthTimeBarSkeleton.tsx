import { CosSegmentedBarSkeleton } from '@cube-frontend/ui-library'
import { HealthTimeBarXAxisSkeleton } from './HealthTimeBarXAxisSkeleton'

export const HealthTimeBarSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <CosSegmentedBarSkeleton />
        <HealthTimeBarXAxisSkeleton />
      </div>
      <div className="flex flex-col gap-y-[19px] pt-[19px]">
        <CosSegmentedBarSkeleton />
        <HealthTimeBarXAxisSkeleton />
      </div>
    </div>
  )
}
