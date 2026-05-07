import { useState } from 'react'
import {
  CosGeneralPanel,
  CosOverflowMenu,
  CosTableRow,
  CosViewDetailsTableDetailItem,
  GetCosViewDetailsTable,
  useExpandedRowIdSet,
} from '@cube-frontend/ui-library'
import { Node } from '@cube-frontend/api'
import OverflowMenuHorizontal from '@cube-frontend/ui-library/icons/monochrome/overflow_menu_horizontal.svg?react'
import { ResourceEditModal } from './ResourceEditModal'
import WarningFilled from '@cube-frontend/ui-library/icons/monochrome/warning_filled.svg?react'
import {
  GpuResourceType,
  GpuStatus,
  mockData,
  NodeResourceInner,
} from './mockResources'
import { toReadableUsedSize } from '@cube-frontend/web-app/utils/byte'

export type ResourceRow = CosTableRow & NodeResourceInner

const ResourceTable = GetCosViewDetailsTable<ResourceRow>()

export type NodeResourcesProps = {
  node: Node | undefined
}

const NodeResources = (props: NodeResourcesProps) => {
  // TODO: replace mock data with real data from API when available
  const { node: _node } = props

  const [resourceIdToEdit, setResourceIdToEdit] = useState<string | null>(null)

  const editTarget = mockData.find((row) => row.id === resourceIdToEdit)

  const openResourceEditModal = (row: ResourceRow) => {
    setResourceIdToEdit(row.id)
  }

  const closeResourceEditModal = () => {
    setResourceIdToEdit(null)
  }

  const renderResourceType = (resourceType: GpuResourceType) => {
    if (resourceType === GpuResourceType.Unset) {
      return <span className="text-functional-text-light">Unset</span>
    }

    return resourceType
  }

  const renderVRamAllocation = (row: ResourceRow) => {
    if (row.resourceType === GpuResourceType.Unset) return null
    const { total, used, sizeUnit } = toReadableUsedSize({
      used: row.vram.allocatedGiB,
      total: row.vram.totalGiB,
      originalSizeUnit: 'GiB',
    })
    return `${used} ${sizeUnit} / ${total} ${sizeUnit}`
  }

  const renderVramUtilization = (row: ResourceRow) => {
    if (row.resourceType === GpuResourceType.Unset) return null
    return `${row.vram.utilizationPercent}%`
  }

  const renderGpuUtilization = (row: ResourceRow) => {
    if (row.resourceType === GpuResourceType.Unset) return null
    return `${row.gpu.utilizationPercent}%`
  }

  const renderStatus = (status: GpuStatus) => {
    if (status === GpuStatus.Unassigned) {
      return (
        <div className="flex items-center gap-x-2">
          <span className="text-status-warning">Unassigned</span>
          <WarningFilled className="icon-md text-status-warning" />
        </div>
      )
    }

    return status
  }

  const renderAllocationSummary = (
    allocationSummary: ResourceRow['allocationSummary'],
    row: ResourceRow,
  ) => {
    if (row.resourceType === GpuResourceType.Unset) return null
    return `${allocationSummary.current} / ${allocationSummary.total}`
  }

  const renderAction = (row: ResourceRow) => {
    return (
      <CosOverflowMenu
        triggerElement={
          <OverflowMenuHorizontal className="icon-md cursor-pointer" />
        }
      >
        <CosOverflowMenu.Item
          title="Edit Resource Type"
          type="plain"
          onClick={() => openResourceEditModal(row)}
        />
      </CosOverflowMenu>
    )
  }

  const { expandedRowIdSet, onExpandChange } = useExpandedRowIdSet()

  const getDetailItems = (
    _resource: ResourceRow,
  ): CosViewDetailsTableDetailItem[] => {
    return [
      // TODO: wait for customized table details component.
    ]
  }

  return (
    <>
      <CosGeneralPanel
        leftSlot={
          <div className="primary-body3 text-functional-text">
            Resource list
          </div>
        }
      >
        {/* TODO: replace mock data with real data from API when available */}
        <ResourceTable
          isLoading={false}
          rows={mockData}
          expandedRowIdSet={expandedRowIdSet}
          onExpandChange={onExpandChange}
          getDetailItems={getDetailItems}
        >
          <ResourceTable.Column
            label="GPU card"
            property="name"
            emphasize={true}
          />
          <ResourceTable.Column label="Resource type" property="resourceType">
            {renderResourceType}
          </ResourceTable.Column>
          <ResourceTable.Column label="VRAM Allocation" property="vram">
            {(_, row) => renderVRamAllocation(row)}
          </ResourceTable.Column>
          <ResourceTable.Column label="VRAM Utilization" property="vram">
            {(_, row) => renderVramUtilization(row)}
          </ResourceTable.Column>
          <ResourceTable.Column label="GPU Utilization" property="gpu">
            {(_, row) => renderGpuUtilization(row)}
          </ResourceTable.Column>
          <ResourceTable.Column label="PCI Address" property="pciAddress" />
          <ResourceTable.Column label="Status" property="status">
            {renderStatus}
          </ResourceTable.Column>
          <ResourceTable.Column label="Allocation" property="allocationSummary">
            {(allocationSummary, row) =>
              renderAllocationSummary(allocationSummary, row)
            }
          </ResourceTable.Column>
          <ResourceTable.Column property="name">
            {(_, row) => renderAction(row)}
          </ResourceTable.Column>
        </ResourceTable>
      </CosGeneralPanel>
      <ResourceEditModal
        isModalOpen={!!editTarget}
        resource={editTarget}
        onClose={closeResourceEditModal}
      />
    </>
  )
}

export default NodeResources
