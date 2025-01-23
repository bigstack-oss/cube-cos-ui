import { CosTooltip } from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'

const longText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ' +
  'do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
  'laboris nisi ut aliquip ex ea commodo consequat. Duis aute ' +
  'irure dolor in reprehenderit in voluptate velit esse cillum ' +
  'dolore eu fugiat nulla pariatur. Excepteur sint occaecat ' +
  'cupidatat non proident, sunt in culpa qui officia deserunt ' +
  'mollit anim id est laborum.'

export const LayoutGrid = () => {
  const icon = <InformationCircle className="icon-md" />

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-center">
        <span className="secondary-body3 w-40">With Title and Subtext</span>
        <CosTooltip
          hoverContent={{
            title: 'Title',
            subtext: 'Subtext',
            message: 'Lorem ipsum dolor sit amet',
          }}
        >
          {icon}
        </CosTooltip>
      </div>
      <div className="flex items-center">
        <span className="secondary-body3 w-40">Multiple Rows</span>
        <CosTooltip
          hoverContent={{
            message: longText,
          }}
        >
          {icon}
        </CosTooltip>
      </div>
      <div className="flex items-center">
        <span className="secondary-body3 w-40">Multiple Rows with Title</span>
        <CosTooltip
          hoverContent={{
            title: 'Title',
            message: longText,
          }}
        >
          {icon}
        </CosTooltip>
      </div>
    </div>
  )
}
