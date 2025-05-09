import { CosSkeleton } from '@cube-frontend/ui-library'

export const ServiceHealthStatusSkeleton = () => {
  return (
    <div className="flex w-[150px] items-center gap-x-2">
      <CosSkeleton className="size-[13px]" />
      <CosSkeleton className="h-[16px] w-[129px]" />
    </div>
  )
}
