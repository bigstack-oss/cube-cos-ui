import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { baseClass } from './cosStatusReactionUtils'

export const CosStatusReactionSkeleton = () => {
  return (
    <div className={baseClass}>
      <CosSkeleton className="size-4" />
      <CosSkeleton className="h-4 w-11" />
    </div>
  )
}
