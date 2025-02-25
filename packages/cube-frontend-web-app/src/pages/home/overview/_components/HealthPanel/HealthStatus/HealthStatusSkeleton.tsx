import { range } from 'lodash'
import { CosSkeleton } from '@cube-frontend/ui-library'

export const ServiceStatusSkeleton = () => {
  return (
    <div className="flex items-center gap-x-2">
      <CosSkeleton className="size-[13px]" />
      <CosSkeleton className="h-[16px] w-[129px]" />
    </div>
  )
}

type CategoryStatusSkeletonProps = {
  serviceCount: number
}

export const CategoryStatusSkeleton = (props: CategoryStatusSkeletonProps) => {
  const { serviceCount } = props

  return (
    <div className="flex flex-col gap-y-3">
      {range(serviceCount).map((index) => (
        <ServiceStatusSkeleton key={index} />
      ))}
    </div>
  )
}

const categorySkeletonServiceCounts = [4, 4, 4, 4, 4, 2, 4]

export const HealthStatusSkeleton = () => {
  return (
    <div className="flex gap-x-3 overflow-hidden">
      {categorySkeletonServiceCounts.map((serviceCount, index) => (
        <CategoryStatusSkeleton key={index} serviceCount={serviceCount} />
      ))}
    </div>
  )
}
