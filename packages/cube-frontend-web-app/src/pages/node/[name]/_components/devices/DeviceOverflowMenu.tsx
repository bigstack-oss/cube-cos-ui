import { useTranslation } from 'react-i18next'
import { ListNodeDevicesResponseDataInnerAvailabilityEnum } from '@cube-frontend/api'
import {
  CosOverflowMenu,
  type CosOverflowMenuItemProps,
} from '@cube-frontend/ui-library'
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

  const { t } = useTranslation()

  const getDiskActions = (): CosOverflowMenuItemProps[] => {
    const actions: CosOverflowMenuItemProps[] = []

    const canAdd =
      row.availability ===
      ListNodeDevicesResponseDataInnerAvailabilityEnum.Available
    const canRemove =
      row.availability ===
      ListNodeDevicesResponseDataInnerAvailabilityEnum.InUse

    if (canAdd) {
      actions.push({
        type: 'plain',
        title: t('nodes.details.devices.addDisk'),
        onClick: onAddDiskClick,
      })
    }

    if (canRemove) {
      actions.push({
        type: 'plain',
        title: t('nodes.details.devices.removeDisk'),
        onClick: onRemoveDiskClick,
      })
    }

    return actions
  }

  const getOSDActions = (): CosOverflowMenuItemProps[] => {
    if (!row.osd.daemons.length) return []

    return [
      {
        type: 'plain',
        title: t('nodes.details.devices.removeOSDs'),
        onClick: onRemoveOSDsClick,
      },
      {
        type: 'plain',
        title: t('nodes.details.devices.restartOSDs'),
        onClick: onRestartOSDsClick,
      },
    ]
  }

  const diskActions = getDiskActions()

  const osdActions = getOSDActions()

  if (!diskActions.length && !osdActions.length) return null

  return (
    <CosOverflowMenu
      triggerElement={
        <OverflowMenuVertical className="icon-md cursor-pointer" />
      }
    >
      {diskActions.map((itemProps) => (
        <CosOverflowMenu.Item key={itemProps.title} {...itemProps} />
      ))}
      {diskActions.length > 0 && osdActions.length > 0 && (
        <CosOverflowMenu.Divider />
      )}
      {osdActions.map((itemProps) => (
        <CosOverflowMenu.Item key={itemProps.title} {...itemProps} />
      ))}
    </CosOverflowMenu>
  )
}
