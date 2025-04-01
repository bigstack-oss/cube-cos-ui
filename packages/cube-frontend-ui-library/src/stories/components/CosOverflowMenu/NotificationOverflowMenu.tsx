import { CosOverflowMenu } from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import CircleFilled from '@cube-frontend/ui-library/icons/monochrome/circle_fill.svg?react'
import WarningAltFilled from '@cube-frontend/ui-library/icons/monochrome/warning_alt_filled.svg?react'
import { OverflowMenuTrigger } from './OverflowMenuTrigger'

export const NotificationOverflowMenu = () => {
  const onItemClick = () => {
    alert('Item clicked')
  }

  return (
    <CosOverflowMenu triggerElement={<OverflowMenuTrigger />}>
      <CosOverflowMenu.Item
        type="custom-leading-element"
        title="Option Title 1"
        element={<WarningAltFilled className="icon-md text-status-warning" />}
        onClick={onItemClick}
      />
      <CosOverflowMenu.Item
        type="custom-leading-element"
        title="Option Title 2"
        element={<CircleFilled className="icon-md text-cosmos-primary" />}
        onClick={onItemClick}
      />
      <CosOverflowMenu.Item
        type="custom-leading-element"
        title="Option Title 3"
        subText="Subtext"
        element={
          <CircleFilled className="icon-md text-functional-disable-text" />
        }
        disabled={true}
        onClick={onItemClick}
      />
      <CosOverflowMenu.Divider />
      <CosOverflowMenu.Item
        type="trailing-icon"
        title="View All"
        TrailingIcon={ChevronRight}
        onClick={onItemClick}
      />
    </CosOverflowMenu>
  )
}
