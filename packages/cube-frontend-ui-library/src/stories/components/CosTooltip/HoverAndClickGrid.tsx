import { CosTooltip } from '@cube-frontend/ui-library'
import Copy from '@cube-frontend/ui-library/icons/monochrome/copy.svg?react'

export const HoverAndClickGrid = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <p className="secondary-body2 text-functional-text">
        Show different messages on hover and click.
      </p>
      <div className="flex flex-col gap-y-8">
        <div className="flex items-center">
          <span className="secondary-body3 w-40">Message</span>
          <CosTooltip
            hoverContent={{
              message: 'Lorem ipsum dolot sit amet',
            }}
            clickContent={{
              message: 'You have clicked.',
            }}
          >
            <Copy className="icon-md cursor-pointer" />
          </CosTooltip>
        </div>
        <div className="flex items-center">
          <span className="secondary-body3 w-40">Title and Subtext</span>
          <CosTooltip
            placement="bottom-center"
            hoverContent={{
              title: 'Title Before',
              subtext: 'Subtext before',
              message: 'Lorem ipsum dolot sit amet',
            }}
            clickContent={{
              title: 'Title After',
              subtext: 'Subtext after',
              message: 'You have clicked.',
            }}
          >
            <Copy className="icon-md cursor-pointer" />
          </CosTooltip>
        </div>
      </div>
      {/* Leave some space at the bottom to showcase the translate behavior. */}
      <div className="h-6" />
    </div>
  )
}
