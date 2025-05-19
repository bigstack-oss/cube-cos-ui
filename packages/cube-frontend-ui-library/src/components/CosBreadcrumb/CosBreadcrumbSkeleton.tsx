import { range } from 'lodash'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { MAX_BREADCRUMB_ITEMS } from './CosBreadcrumb'

type CosBreadcrumbSkeletonProps = {
  /**
   * @default 5
   */
  length?: number
}

export const CosBreadcrumbSkeleton = (props: CosBreadcrumbSkeletonProps) => {
  const { length = MAX_BREADCRUMB_ITEMS } = props

  return (
    <div className="flex w-fit gap-3">
      {range(0, length).map((_, index) => (
        <div key={index} className="group flex gap-3">
          <CosSkeleton className="h-[18px] w-[86px]" />
          <CosSkeleton className="size-[18px] group-last:hidden" />
        </div>
      ))}
    </div>
  )
}
