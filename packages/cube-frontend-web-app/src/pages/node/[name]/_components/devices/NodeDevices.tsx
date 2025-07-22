import {
  ListNodeDevicesResponseDataInnerAvailabilityEnum,
  ListNodeDevicesResponseDataInnerOsd,
} from '@cube-frontend/api'
import {
  CosButton,
  CosLoadingSpinner,
  CosStatus,
  CosTableInput,
} from '@cube-frontend/ui-library'
import Edit from '@cube-frontend/ui-library/icons/monochrome/edit.svg?react'
import WarningFilled from '@cube-frontend/ui-library/icons/monochrome/warning_filled.svg?react'
import X from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import { isEmpty, upperFirst } from 'lodash'
import { twMerge } from 'tailwind-merge'
import { Panel } from '../Panel'
import { AddDiskModal } from './AddDiskModal'
import { DaemonsInfo } from './DaemonsInfo'
import { DefinedClassCell } from './DefinedClassCell'
import { DeviceOverflowMenu } from './DeviceOverflowMenu'
import {
  DeviceRow,
  DeviceTable,
  formatOSDReweight,
  formatOSDUsage,
  isDeviceOrOsdProcessing,
} from './nodeDevicesUtils'
import { RemoveDiskModal } from './RemoveDiskModal'
import { RemoveOSDsModal } from './RemoveOSDsModal'
import { RestartOSDsModal } from './RestartOSDsModal'
import { useDeviceActionModal } from './useDeviceActionModal'
import { useDeviceRows } from './useDeviceRows'

type NodeDevicesProps = {
  hostname: string | undefined
}

export const NodeDevices = (props: NodeDevicesProps) => {
  const { hostname } = props

  const {
    isLoading,
    rows,
    rowsFieldError,
    onDefinedClassChange,
    onOSDReweightChange,
    onEditClick,
    onSaveClick,
    onCancelEditClick,
  } = useDeviceRows(hostname)

  const renderOSDUsages = (osd: ListNodeDevicesResponseDataInnerOsd) => {
    return (
      <div className="flex flex-col gap-y-1.5">
        {osd.daemons.map((daemon) => (
          <div key={daemon.id} className="primary-body4 text-functional-text">
            {formatOSDUsage(daemon.usagePercent)}
          </div>
        ))}
      </div>
    )
  }

  const renderAvailability = (
    availability: ListNodeDevicesResponseDataInnerAvailabilityEnum,
  ) => {
    if (
      availability ===
      ListNodeDevicesResponseDataInnerAvailabilityEnum.Available
    ) {
      return (
        <div className="flex items-center gap-x-2 whitespace-nowrap">
          <span className="primary-body4 font-medium text-status-positive-text">
            Can be added
          </span>
          <WarningFilled className="icon-md text-status-positive" />
        </div>
      )
    }

    return upperFirst(availability)
  }

  const {
    isOpen: isAddDiskModalOpen,
    targetRow: addDiskModalTargetRow,
    onOpen: onAddDiskModalOpen,
    onClose: onAddDiskModalClose,
  } = useDeviceActionModal()

  const {
    isOpen: isRemoveDiskModalOpen,
    targetRow: removeDiskModalTargetRow,
    onOpen: onRemoveDiskModalOpen,
    onClose: onRemoveDiskModalClose,
  } = useDeviceActionModal()

  const {
    isOpen: isRemoveOSDsModalOpen,
    targetRow: removeOSDsModalTargetRow,
    onOpen: onRemoveOSDsModalOpen,
    onClose: onRemoveOSDsModalClose,
  } = useDeviceActionModal()

  const {
    isOpen: isRestartOSDsModalOpen,
    targetRow: restartOSDsModalTargetRow,
    onOpen: onRestartOSDsModalOpen,
    onClose: onRestartOSDsModalClose,
  } = useDeviceActionModal()

  const renderActions = (row: DeviceRow, rowIndex: number) => {
    if (
      row.availability ===
      ListNodeDevicesResponseDataInnerAvailabilityEnum.System
    ) {
      // Users are not allowed to operate system disk.
      return null
    }
    if (row.isEditing) return renderEditingActions(row, rowIndex)
    return renderNonEditingActions(row)
  }

  const renderEditingActions = (row: DeviceRow, rowIndex: number) => {
    const isProcessing = isDeviceOrOsdProcessing(row)
    return (
      <div className="flex items-center gap-x-2">
        {isProcessing ? (
          <CosLoadingSpinner variant="dot120" />
        ) : (
          <>
            <CosButton
              type="ghost"
              usage="text-only"
              loading={row.isSaving}
              disabled={!isEmpty(rowsFieldError[rowIndex])}
              onClick={() => onSaveClick(row)}
            >
              Save
            </CosButton>
            {!row.isSaving && (
              <X
                className={twMerge(
                  'icon-md cursor-pointer text-functional-title',
                )}
                onClick={() => onCancelEditClick(row)}
              />
            )}
          </>
        )}
      </div>
    )
  }

  const renderNonEditingActions = (row: DeviceRow) => {
    const isProcessing = isDeviceOrOsdProcessing(row)
    const canEdit =
      row.availability ===
      ListNodeDevicesResponseDataInnerAvailabilityEnum.InUse
    return (
      <div className="flex items-center gap-x-4">
        {isProcessing ? (
          <CosLoadingSpinner variant="dot120" />
        ) : (
          <>
            {canEdit && (
              <Edit
                className="icon-md cursor-pointer text-functional-text"
                onClick={() => onEditClick(row)}
              />
            )}
            <DeviceOverflowMenu
              row={row}
              onAddDiskClick={() => onAddDiskModalOpen(row)}
              onRemoveDiskClick={() => onRemoveDiskModalOpen(row)}
              onRemoveOSDsClick={() => onRemoveOSDsModalOpen(row)}
              onRestartOSDsClick={() => onRestartOSDsModalOpen(row)}
            />
          </>
        )}
      </div>
    )
  }

  return (
    <Panel className="gap-y-2">
      <div className="primary-body3 text-functional-text">Devices</div>
      <DeviceTable isLoading={isLoading} rows={rows}>
        <DeviceTable.Column label="Device" property="device" emphasize={true} />
        <DeviceTable.Column label="Serial number" property="serial" />
        <DeviceTable.Column label="Size" property="sizeMiB">
          {(sizeMiB) => (
            <span className="whitespace-nowrap">
              {toReadableSizeString(sizeMiB, 'MiB')}
            </span>
          )}
        </DeviceTable.Column>
        <DeviceTable.Column label="Detected Type" property="type" />
        <DeviceTable.Column label="Defined Class" property="class">
          {(_, row) => (
            <DefinedClassCell
              row={row}
              onChange={(type) => onDefinedClassChange(row, type)}
            />
          )}
        </DeviceTable.Column>
        <DeviceTable.Column label="OSD ID" property="osd">
          {(osd) => <DaemonsInfo daemons={osd.daemons} />}
        </DeviceTable.Column>
        <DeviceTable.Column label="OSD Usage" property="osd">
          {renderOSDUsages}
        </DeviceTable.Column>
        <DeviceTable.Column label="OSD Reweight" property="osd">
          {(osd, row, rowIndex) =>
            row.isEditing ? (
              <CosTableInput
                className="h-[34px] w-[50px]"
                placeholder="OSD reweight"
                value={row.dataForEdit.osdReweight}
                errorMessage={rowsFieldError[rowIndex].osdReweight}
                disabled={row.isSaving}
                onChange={(e) => onOSDReweightChange(row, e)}
              />
            ) : (
              formatOSDReweight(osd.reweight)
            )
          }
        </DeviceTable.Column>
        <DeviceTable.Column label="Availability" property="availability">
          {renderAvailability}
        </DeviceTable.Column>
        <DeviceTable.Column label="Status" property="status">
          {(status) => <CosStatus status={status.current} />}
        </DeviceTable.Column>
        <DeviceTable.Column label="Actions">
          {(_, row, rowIndex) => renderActions(row, rowIndex)}
        </DeviceTable.Column>
      </DeviceTable>
      <AddDiskModal
        nodeName={hostname}
        isOpen={isAddDiskModalOpen}
        targetRow={addDiskModalTargetRow}
        onCloseClick={onAddDiskModalClose}
      />
      <RemoveDiskModal
        nodeName={hostname}
        isOpen={isRemoveDiskModalOpen}
        targetRow={removeDiskModalTargetRow}
        onCloseClick={onRemoveDiskModalClose}
      />
      <RemoveOSDsModal
        nodeName={hostname}
        isOpen={isRemoveOSDsModalOpen}
        targetRow={removeOSDsModalTargetRow}
        onCloseClick={onRemoveOSDsModalClose}
      />
      <RestartOSDsModal
        nodeName={hostname}
        isOpen={isRestartOSDsModalOpen}
        targetRow={restartOSDsModalTargetRow}
        onCloseClick={onRestartOSDsModalClose}
      />
    </Panel>
  )
}
