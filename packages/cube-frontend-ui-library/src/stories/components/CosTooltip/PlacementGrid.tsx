import { CosTooltip, CosTooltipInformation } from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import { twMerge } from 'tailwind-merge'

const hoverContent: CosTooltipInformation = {
  message: 'Lorem ipsum dolor sit amet',
}

const columnClass = twMerge('flex flex-col items-center gap-y-4 [&>*]:h-6')

export const PlacementGrid = () => {
  const renderLeft = () => (
    <div className={columnClass}>
      <span className="primary-body3 flex items-center">Left</span>
      <div className="flex items-center">
        <CosTooltip hoverContent={hoverContent} placement="top-left">
          <InformationCircle className="icon-md" />
        </CosTooltip>
      </div>
      <div className="flex items-center">
        <CosTooltip hoverContent={hoverContent} placement="bottom-left">
          <InformationCircle className="icon-md" />
        </CosTooltip>
      </div>
    </div>
  )

  const renderCenter = () => (
    <div className={columnClass}>
      <span className="primary-body3 flex items-center">Center</span>
      <div className="flex items-center">
        <CosTooltip hoverContent={hoverContent} placement="top-center">
          <InformationCircle className="icon-md" />
        </CosTooltip>
      </div>
      <div className="flex items-center">
        <CosTooltip hoverContent={hoverContent} placement="bottom-center">
          <InformationCircle className="icon-md" />
        </CosTooltip>
      </div>
    </div>
  )

  const renderRight = () => (
    <div className={columnClass}>
      <span className="primary-body3 flex items-center">Right</span>
      <div className="flex items-center">
        <CosTooltip hoverContent={hoverContent} placement="top-right">
          <InformationCircle className="icon-md" />
        </CosTooltip>
      </div>
      <div className="flex items-center">
        <CosTooltip hoverContent={hoverContent} placement="bottom-right">
          <InformationCircle className="icon-md" />
        </CosTooltip>
      </div>
    </div>
  )

  return (
    <div className="grid w-[400px] grid-cols-[64px_repeat(3,1fr)]">
      <div className="primary-body3 flex flex-col gap-y-4 [&>*]:h-6">
        <span />
        <span className="flex items-center">Top</span>
        <span className="flex items-center">Bottom</span>
      </div>
      {renderLeft()}
      {renderCenter()}
      {renderRight()}
    </div>
  )
}
