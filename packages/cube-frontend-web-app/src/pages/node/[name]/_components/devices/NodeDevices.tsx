import {
  CosButton,
  CosDropdown,
  CosPagination,
  CosStatus,
  CosTableInput,
  DEFAULT_ITEMS_PER_PAGE,
  ItemsPerPage,
} from '@cube-frontend/ui-library'
import Edit from '@cube-frontend/ui-library/icons/monochrome/edit.svg?react'
import WarningFilled from '@cube-frontend/ui-library/icons/monochrome/warning_filled.svg?react'
import X from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import { upperFirst } from 'lodash'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Panel } from '../Panel'
import { AddDiskModal } from './AddDiskModal'
import { DaemonsInfo } from './DaemonsInfo'
import { DeviceOverflowMenu } from './DeviceOverflowMenu'
import {
  DeviceRow,
  DeviceTable,
  NodeBlockDeviceInnerWaitingForApiUpdate,
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
    onDefinedClassChange,
    onOSDReweightChange,
    onEditClick,
    onSaveClick,
    onCancelEditClick,
  } = useDeviceRows(hostname)

  const [paginationState, setPaginationState] = useState({
    page: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  })

  const onPageChange = (page: number): void => {
    setPaginationState((prev) => ({
      ...prev,
      page,
    }))
  }

  const onItemsPerPageChange = (itemsPerPage: ItemsPerPage): void => {
    setPaginationState({
      page: 1,
      itemsPerPage,
    })
  }

  const renderOSDUsages = (
    osd: NodeBlockDeviceInnerWaitingForApiUpdate['osd'],
  ) => {
    return (
      <div className="flex flex-col gap-y-1.5">
        {osd.daemons.map((daemon) => (
          <div key={daemon.id} className="primary-body4 text-functional-text">
            {`${daemon.usagePercent}%`}
          </div>
        ))}
      </div>
    )
  }

  const renderAvailability = (availability: string) => {
    if (availability === 'can be added') {
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

  const renderEditingActions = (row: DeviceRow) => {
    return (
      <div className="flex items-center gap-x-2">
        <CosButton
          type="ghost"
          usage="text-only"
          loading={row.isSaving}
          onClick={() => onSaveClick(row)}
        >
          Save
        </CosButton>
        <X
          className={twMerge(
            'icon-md cursor-pointer text-functional-title',
            row.isSaving && 'cursor-default',
          )}
          onClick={() => {
            if (!row.isSaving) {
              onCancelEditClick(row)
            }
          }}
        />
      </div>
    )
  }

  const renderNonEditingActions = (row: DeviceRow) => {
    return (
      <div className="flex items-center gap-x-4">
        <Edit
          className="icon-md cursor-pointer text-functional-text"
          onClick={() => onEditClick(row)}
        />
        <DeviceOverflowMenu
          row={row}
          onAddDiskClick={() => onAddDiskModalOpen(row)}
          onRemoveDiskClick={() => onRemoveDiskModalOpen(row)}
          onRemoveOSDsClick={() => onRemoveOSDsModalOpen(row)}
          onRestartOSDsClick={() => onRestartOSDsModalOpen(row)}
        />
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
          {(sizeMiB) => toReadableSizeString(sizeMiB, 'MiB')}
        </DeviceTable.Column>
        <DeviceTable.Column label="Detected Type" property="type" />
        <DeviceTable.Column label="Defined Class" property="class">
          {(definedClass, row) =>
            row.isEditing ? (
              <CosDropdown
                variant="in-table"
                selectedItems={[row.dataForEdit.definedClass]}
                disabled={row.isSaving}
              >
                <CosDropdown.Trigger>
                  {row.dataForEdit.definedClass}
                </CosDropdown.Trigger>
                <CosDropdown.Menu>
                  <CosDropdown.Item
                    item="SSD"
                    onClick={() => onDefinedClassChange(row, 'SSD')}
                  >
                    SSD
                  </CosDropdown.Item>
                  <CosDropdown.Item
                    item="HDD"
                    onClick={() => onDefinedClassChange(row, 'HDD')}
                  >
                    HDD
                  </CosDropdown.Item>
                </CosDropdown.Menu>
              </CosDropdown>
            ) : (
              definedClass
            )
          }
        </DeviceTable.Column>
        <DeviceTable.Column label="OSD ID" property="osd">
          {(osd) => <DaemonsInfo daemons={osd.daemons} />}
        </DeviceTable.Column>
        <DeviceTable.Column label="OSD Usage" property="osd">
          {renderOSDUsages}
        </DeviceTable.Column>
        <DeviceTable.Column label="OSD Reweight" property="osd">
          {(osd, row) =>
            row.isEditing ? (
              <CosTableInput
                className="w-[50px]"
                placeholder="OSD reweight"
                value={row.dataForEdit.osdReweight}
                disabled={row.isSaving}
                onChange={(e) => onOSDReweightChange(row, e)}
              />
            ) : (
              osd.reweight.toFixed(1)
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
          {(_, row) =>
            row.isEditing
              ? renderEditingActions(row)
              : renderNonEditingActions(row)
          }
        </DeviceTable.Column>
      </DeviceTable>
      <CosPagination
        isLoading={isLoading}
        totalItems={rows.length ?? 0}
        currentPage={paginationState.page}
        itemsPerPage={paginationState.itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
      <AddDiskModal
        isOpen={isAddDiskModalOpen}
        targetRow={addDiskModalTargetRow}
        onAccepted={onAddDiskModalClose}
        onCloseClick={onAddDiskModalClose}
      />
      <RemoveDiskModal
        isOpen={isRemoveDiskModalOpen}
        targetRow={removeDiskModalTargetRow}
        onAccepted={onRemoveDiskModalClose}
        onCloseClick={onRemoveDiskModalClose}
      />
      <RemoveOSDsModal
        isOpen={isRemoveOSDsModalOpen}
        targetRow={removeOSDsModalTargetRow}
        onAccepted={onRemoveOSDsModalClose}
        onCloseClick={onRemoveOSDsModalClose}
      />
      <RestartOSDsModal
        isOpen={isRestartOSDsModalOpen}
        targetRow={restartOSDsModalTargetRow}
        onAccepted={onRestartOSDsModalClose}
        onCloseClick={onRestartOSDsModalClose}
      />
    </Panel>
  )
}
