import { Node, NodeBlockDevicesInner } from '@cube-frontend/api'
import {
  CosPagination,
  CosStatus,
  CosTableRow,
  DEFAULT_ITEMS_PER_PAGE,
  GetCosBasicTable,
  ItemsPerPage,
} from '@cube-frontend/ui-library'
import WarningFilled from '@cube-frontend/ui-library/icons/monochrome/warning_filled.svg?react'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import { capitalize } from 'lodash'
import { useMemo, useState } from 'react'
import { Panel } from './Panel'

type NodeDevicesProps = {
  node: Node | undefined
}

type DeviceRow = CosTableRow & NodeBlockDevicesInner

const DeviceTable = GetCosBasicTable<DeviceRow>()

export const NodeDevices = (props: NodeDevicesProps) => {
  const { node } = props

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

  const rows = useMemo<DeviceRow[]>(() => {
    const devices = node?.blockDevices ?? []
    const { page, itemsPerPage } = paginationState
    const start = (page - 1) * itemsPerPage
    return devices.slice(start, start + itemsPerPage).map((device) => ({
      id: device.device,
      ...device,
    }))
  }, [node?.blockDevices, paginationState])

  const renderAvailability = (availability: string) => {
    if (availability === 'can be added') {
      return (
        <div className="flex items-center gap-x-2">
          <span className="primary-body4 font-medium text-status-positive-text">
            Can be added
          </span>
          <WarningFilled className="icon-md text-status-positive" />
        </div>
      )
    }

    return capitalize(availability)
  }

  return (
    <Panel className="gap-y-2">
      <div className="primary-body3 text-functional-text">Devices</div>
      <DeviceTable isLoading={!node} rows={rows}>
        <DeviceTable.Column label="Device" property="device" emphasize={true} />
        <DeviceTable.Column label="Serial number" property="serial" />
        <DeviceTable.Column label="Type" property="type" />
        <DeviceTable.Column label="Size" property="sizeMiB">
          {(sizeMiB) => toReadableSizeString(sizeMiB, 'MiB')}
        </DeviceTable.Column>
        <DeviceTable.Column label="Availability" property="availability">
          {renderAvailability}
        </DeviceTable.Column>
        <DeviceTable.Column label="Status" property="status">
          {(status) => <CosStatus status={status.current} />}
        </DeviceTable.Column>
      </DeviceTable>
      <CosPagination
        isLoading={!node}
        totalItems={node?.blockDevices.length ?? 0}
        currentPage={paginationState.page}
        itemsPerPage={paginationState.itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </Panel>
  )
}
