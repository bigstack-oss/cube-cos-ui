import { range } from 'lodash'
import { CosGeneralPanel, CosSkeleton } from '@cube-frontend/ui-library'
import { HealthBarSkeleton } from './HealthBarSkeleton'

export const CategoryHealthPanelSkeleton = () => {
  return (
    <CosGeneralPanel>
      <div className="flex flex-col gap-y-6">
        <CosSkeleton className="h-[22px] w-24" />
        <div className="grid grid-cols-2 gap-6">
          {range(0, 4).map((serviceIndex) => (
            <div key={serviceIndex} className="flex flex-col gap-y-2">
              <CosSkeleton className="h-[18px] w-32" />
              <div className="rounded-t-[5px] border border-functional-border-divider">
                <div className="bg-scene-background px-4 py-2">
                  <CosSkeleton className="h-5 w-32" />
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
      </div>
    </CosGeneralPanel>
  )
}
