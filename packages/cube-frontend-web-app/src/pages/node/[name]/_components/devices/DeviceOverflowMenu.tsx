import { CosOverflowMenu } from '@cube-frontend/ui-library'
import OverflowMenuVertical from '@cube-frontend/ui-library/icons/monochrome/overflow_menu_vertical.svg?react'
import { DeviceRow } from './nodeDevicesUtils'

type DeviceOverflowMenuProps = {
  row: DeviceRow
  onAddDiskClick: () => void
  onRemoveDiskClick: () => void
  onRemoveOSDsClick: () => void
  onRestartOSDsClick: () => void
}

export const DeviceOverflowMenu = (props: DeviceOverflowMenuProps) => {
  const {
    row,
    onAddDiskClick,
    onRemoveDiskClick,
    onRemoveOSDsClick,
    onRestartOSDsClick,
  } = props

  const isFormatted = row.osd.daemons.length > 0

  return (
    <CosOverflowMenu
      triggerElement={
        <OverflowMenuVertical className="icon-md cursor-pointer" />
      }
    >
      {!isFormatted ? (
        <CosOverflowMenu.Item
          type="plain"
          title="Add disk"
          onClick={onAddDiskClick}
        />
      ) : (
        <>
          <CosOverflowMenu.Item
            type="plain"
            title="Remove disk"
            onClick={onRemoveDiskClick}
          />
          <CosOverflowMenu.Divider />
          <CosOverflowMenu.Item
            type="plain"
            title="Remove OSDs"
            onClick={onRemoveOSDsClick}
          />
          <CosOverflowMenu.Item
            type="plain"
            title="Restart OSDs"
            onClick={onRestartOSDsClick}
          />
        </>
      )}
    </CosOverflowMenu>
  )
}
