import { cva } from 'class-variance-authority'
import { CosSkeleton } from '../../components/CosSkeleton/CosSkeleton'

type CosPaginationSkeletonProps = {
  isMinimal: boolean
}

const itemWrap = cva('flex items-center', {
  variants: { isMinimal: { true: 'gap-x-1.5', false: 'gap-x-3' } },
})

export const CosPaginationSkeleton = (props: CosPaginationSkeletonProps) => {
  const { isMinimal } = props

  return (
    <div className="flex w-full items-center justify-between gap-x-[10px]">
      {/** Amount */}
      <CosSkeleton className="h-7 w-[67px] shrink-0" />
      <div className="flex gap-x-4">
        {/** Items */}
        <div className={itemWrap({ isMinimal })}>
          {Array.from({ length: 9 }).map((_, index) => (
            <CosSkeleton key={index} className="size-7 shrink-0" />
          ))}
        </div>
        {/** Go to Input */}
        <div className="flex items-center gap-x-[10px]">
          {!isMinimal && <CosSkeleton className="h-7 w-[31px]" />}
          <CosSkeleton className="h-7 w-[59px]" />
        </div>
      </div>
      {/** View Dropdown */}
      <div className="flex items-center gap-x-[10px]">
        {!isMinimal && <CosSkeleton className="size-7" />}
        <CosSkeleton className="h-7 w-[80px]" />
      </div>
    </div>
  )
}
