import { CosTooltip } from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'

export const NestedLayout = () => {
  return (
    <div className="max-h-32 w-64 overflow-auto rounded-md border">
      <div className="h-96 p-12">
        <div className="mb-24">Scroll down to see the tooltip.</div>
        <CosTooltip
          hoverContent={{
            message: 'Lorem ipsum dolor sit amet',
          }}
        >
          <InformationCircle className="icon-md" />
        </CosTooltip>
      </div>
    </div>
  )
}
