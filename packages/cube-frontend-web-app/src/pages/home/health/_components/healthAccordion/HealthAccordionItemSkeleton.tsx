import { CosSkeleton } from '@cube-frontend/ui-library'
import { range } from 'lodash'
import { HealthBarSkeleton } from './HealthBarSkeleton'

export const HealthAccordionItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-6 rounded-[5px] bg-grey-0 px-8 py-6">
      <CosSkeleton className="h-8 w-24" />
      {range(0, 3).map((serviceIndex) => (
        <div key={serviceIndex} className="flex flex-col gap-y-2">
          <CosSkeleton className="h-4 w-32" />
          <div className="rounded-t-[5px] border border-functional-border-divider">
            <div className="bg-scene-background px-4 py-2">
              <CosSkeleton className="h-4 w-32" />
            </div>
            {range(0, 3).map((moduleIndex) => (
              <div
                key={moduleIndex}
                className="border-t border-t-functional-border-divider px-12 py-7 pb-3"
              >
                <CosSkeleton className="h-4 w-16" />
                <HealthBarSkeleton />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
