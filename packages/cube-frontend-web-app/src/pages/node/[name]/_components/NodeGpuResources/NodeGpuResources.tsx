import { useContext, useState } from 'react'
import {
  CosButton,
  CosGeneralPanel,
  CosLoadingSpinner,
  CosOverflowMenu,
  CosTableRow,
  GetCosViewDetailsTable,
  useExpandedRowIdSet,
} from '@cube-frontend/ui-library'
import {
  GPUCardStatus,
  GPUResourceType,
  ListNodeGPUCardsResponseDataInner,
  Node,
  NodesApiListNodeGPUCardsRequest,
} from '@cube-frontend/api'
import OverflowMenuHorizontal from '@cube-frontend/ui-library/icons/monochrome/overflow_menu_horizontal.svg?react'
import { ResourceEditModal } from '../ResourceEditModal'
import WarningFilled from '@cube-frontend/ui-library/icons/monochrome/warning_filled.svg?react'
import FullScreen from '@cube-frontend/ui-library/icons/monochrome/full_screen.svg?react'
import { mockGpuResource } from '../mockGpuResources'
import { toReadableUsedSize } from '@cube-frontend/web-app/utils/byte'
import GpuDetails from './GpuDetails'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { GpuDetailsFullViewModal } from './GpuDetailsFullViewModal/GpuDetailsFullViewModal'

export type GpuResourceRow = CosTableRow & ListNodeGPUCardsResponseDataInner

const GpuResourceTable = GetCosViewDetailsTable<GpuResourceRow>()

export type NodeGpuResourcesProps = {
  node: Node | undefined
}

const GPU_POLLING_INTERVAL = 5000

const GpuStatusDisplayMap: Record<GPUCardStatus, string> = {
  [GPUCardStatus.Unassigned]: 'Unassigned',
  [GPUCardStatus.Idle]: 'Idle',
  [GPUCardStatus.InUse]: 'In-use',
}

const resourceTypeDisplayMap: Record<GPUResourceType, string> = {
  [GPUResourceType.Unset]: 'Unset',
  [GPUResourceType.Pgpu]: 'Passthrough',
  [GPUResourceType.SriovVgpu]: 'SR-IOV vGPU',
  [GPUResourceType.MigBackedVgpu]: 'MIG-backed vGPU',
}

const NodeGpuResources = (props: NodeGpuResourcesProps) => {
  const { node } = props

  const { dataCenter } = useContext(DataCenterContext)

  const {
    hasResponseBeenReceived,
    data: gpuResources = [],
    getResource: refreshGpuResources,
  } = useCosGetRequest(nodesApi.listNodeGPUCards, () => {
    if (!node) return null

    return {
      dataCenter: dataCenter!.name,
      nodeName: node.hostname,
    } satisfies NodesApiListNodeGPUCardsRequest
  })

  usePolling(refreshGpuResources, GPU_POLLING_INTERVAL)

  const [resourceIdToFullView, setResourceIdToFullView] = useState<
    string | null
  >(null)

  const [resourceIdToEdit, setResourceIdToEdit] = useState<string | null>(null)

  const fullViewTarget = gpuResources.find(
    (row) => row.id === resourceIdToFullView,
  )

  const editTarget = mockGpuResource.find((row) => row.id === resourceIdToEdit)

  const openResourceFullView = (row: GpuResourceRow) => {
    setResourceIdToFullView(row.id)
  }

  const closeResourceFullView = () => {
    setResourceIdToFullView(null)
  }

  const openResourceEditModal = (row: GpuResourceRow) => {
    setResourceIdToEdit(row.id)
  }

  const closeResourceEditModal = () => {
    setResourceIdToEdit(null)
  }

  const renderName = (name: string, row: GpuResourceRow) => {
    return (
      <div className="flex items-center gap-x-2">
        {name}
        {row.status.isProcessing && <CosLoadingSpinner variant="dot120" />}
      </div>
    )
  }

  const renderResourceType = (resourceType: GPUResourceType) => {
    if (resourceType === GPUResourceType.Unset) {
      return <span className="text-functional-text-light">Unset</span>
    }

    return resourceTypeDisplayMap[resourceType]
  }

  const renderVRamAllocation = (row: GpuResourceRow) => {
    if (row.resourceType === GPUResourceType.Unset) return null
    if (!row.vram) return null

    const { total, used, sizeUnit } = toReadableUsedSize({
      used: row.vram.allocatedMiB,
      total: row.vram.totalMiB,
      originalSizeUnit: 'MiB',
    })

    return `${used} ${sizeUnit} / ${total} ${sizeUnit}`
  }

  const renderVramUtilization = (row: GpuResourceRow) => {
    if (row.resourceType === GPUResourceType.Unset) return null
    if (!row.vram) return null

    return `${row.vram.utilizationPercent}%`
  }

  const renderGpuUtilization = (row: GpuResourceRow) => {
    if (row.resourceType === GPUResourceType.Unset) return null
    if (!row.gpu) return null

    return `${row.gpu.utilizationPercent}%`
  }

  const renderStatus = (status: GPUCardStatus) => {
    if (status === GPUCardStatus.Unassigned) {
      return (
        <div className="flex items-center gap-x-2">
          <span className="text-status-warning">
            {GpuStatusDisplayMap[status]}
          </span>
          <WarningFilled className="icon-md text-status-warning" />
        </div>
      )
    }

    return GpuStatusDisplayMap[status]
  }

  const renderAllocationSummary = (
    allocationSummary: GpuResourceRow['allocationSummary'],
    row: GpuResourceRow,
  ) => {
    if (row.resourceType === GPUResourceType.Unset) return null
    if (!allocationSummary) return null

    return `${allocationSummary.current} / ${allocationSummary.total}`
  }

  const renderAction = (row: GpuResourceRow) => {
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

  const renderDetailsTable = (row: GpuResourceRow) => {
    return (
      <div className="flex w-full justify-between gap-x-4">
        <GpuDetails row={row} />
        <CosButton
          type="ghost"
          usage="icon-only"
          Icon={FullScreen}
          onClick={() => openResourceFullView(row)}
        />
      </div>
    )
  }

  const isRowExpandDisabled = (row: GpuResourceRow) => {
    if (row.resourceType === GPUResourceType.Unset) {
      return true
    }

    if (
      row.resourceType === GPUResourceType.Pgpu &&
      row.status.current === GPUCardStatus.Idle
    ) {
      return true
    }

    return false
  }

  return (
    <>
      <CosGeneralPanel
        leftSlot={
          <div className="primary-body3 text-functional-text">
            GPU Resources
          </div>
        }
      >
        <GpuResourceTable
          isLoading={!hasResponseBeenReceived}
          rows={gpuResources}
          expandedRowIdSet={expandedRowIdSet}
          onExpandChange={onExpandChange}
          getCustomizedDetailCell={renderDetailsTable}
          isRowExpandDisabled={isRowExpandDisabled}
        >
          <GpuResourceTable.Column
            label="GPU card"
            property="name"
            emphasize={true}
          >
            {renderName}
          </GpuResourceTable.Column>
          <GpuResourceTable.Column
            label="Resource type"
            property="resourceType"
          >
            {renderResourceType}
          </GpuResourceTable.Column>
          <GpuResourceTable.Column label="VRAM Allocation" property="vram">
            {(_, row) => renderVRamAllocation(row)}
          </GpuResourceTable.Column>
          <GpuResourceTable.Column label="VRAM Utilization" property="vram">
            {(_, row) => renderVramUtilization(row)}
          </GpuResourceTable.Column>
          <GpuResourceTable.Column label="GPU Utilization" property="gpu">
            {(_, row) => renderGpuUtilization(row)}
          </GpuResourceTable.Column>
          <GpuResourceTable.Column label="PCI Address" property="pciAddress" />
          <GpuResourceTable.Column label="Status" property="status">
            {(_, row) => renderStatus(row.status.current)}
          </GpuResourceTable.Column>
          <GpuResourceTable.Column
            label="Allocation"
            property="allocationSummary"
          >
            {(allocationSummary, row) =>
              renderAllocationSummary(allocationSummary, row)
            }
          </GpuResourceTable.Column>
          <GpuResourceTable.Column property="name">
            {(_, row) => renderAction(row)}
          </GpuResourceTable.Column>
        </GpuResourceTable>
      </CosGeneralPanel>
      <GpuDetailsFullViewModal
        isModalOpen={!!fullViewTarget}
        resource={fullViewTarget}
        onClose={closeResourceFullView}
      />
      <ResourceEditModal
        isModalOpen={!!editTarget}
        resource={editTarget}
        onClose={closeResourceEditModal}
      />
    </>
  )
}

export default NodeGpuResources
