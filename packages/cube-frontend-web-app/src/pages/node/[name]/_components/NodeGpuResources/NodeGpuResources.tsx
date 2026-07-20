import { useContext, useState } from 'react'
import {
  CosButton,
  CosGeneralPanel,
  CosLoadingSpinner,
  CosOverflowMenu,
  CosTooltip,
  GetCosViewDetailsTable,
  useExpandedRowIdSet,
} from '@cube-frontend/ui-library'
import {
  GPUCardStatus,
  GPUResourceType,
  Node,
  NodesApiListNodeGPUCardsRequest,
} from '@cube-frontend/api'
import OverflowMenuHorizontal from '@cube-frontend/ui-library/icons/monochrome/overflow_menu_horizontal.svg?react'
import WarningFilled from '@cube-frontend/ui-library/icons/monochrome/warning_filled.svg?react'
import FullScreen from '@cube-frontend/ui-library/icons/monochrome/full_screen.svg?react'
import { toReadableUsedSize } from '@cube-frontend/web-app/utils/byte'
import GpuDetails from './GpuDetails'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { GpuDetailsFullViewModal } from './GpuDetailsFullViewModal/GpuDetailsFullViewModal'
import { EditGPUResourceModal } from './EditGPUResourceModal/EditGPUResourceModal'
import { GpuResourceRow, GpuTypeLabelKeyMap } from './utils'
import { useTranslation } from 'react-i18next'
import { ParseKeys } from 'i18next'

const GpuResourceTable = GetCosViewDetailsTable<GpuResourceRow>()

export type NodeGpuResourcesProps = {
  node: Node | undefined
}

const GPU_POLLING_INTERVAL = 5000

const GpuStatusDisplayKeyMap: Record<GPUCardStatus, ParseKeys> = {
  [GPUCardStatus.Unassigned]: 'nodes.details.gpuList.status.unassigned',
  [GPUCardStatus.Idle]: 'nodes.details.gpuList.status.idle',
  [GPUCardStatus.InUse]: 'nodes.details.gpuList.status.inUse',
}

const NodeGpuResources = (props: NodeGpuResourcesProps) => {
  const { node } = props

  const { t } = useTranslation()

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

  const editTarget = gpuResources.find((row) => row.id === resourceIdToEdit)

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
    const translatedTypeLabel = t(GpuTypeLabelKeyMap[resourceType])

    if (resourceType === GPUResourceType.Unset) {
      return (
        <span className="text-functional-text-light">
          {translatedTypeLabel}
        </span>
      )
    }

    return translatedTypeLabel
  }

  const renderVRamAllocation = (row: GpuResourceRow) => {
    if (!row.vram) return null

    const { total, used, sizeUnit } = toReadableUsedSize({
      used: row.vram.allocatedMiB,
      total: row.vram.totalMiB,
      originalSizeUnit: 'MiB',
    })

    return `${used} ${sizeUnit} / ${total} ${sizeUnit}`
  }

  const renderVramUtilization = (row: GpuResourceRow) => {
    if (!row.vram) return null

    return `${row.vram.utilizationPercent}%`
  }

  const renderGpuUtilization = (row: GpuResourceRow) => {
    if (!row.gpu) return null

    return `${row.gpu.utilizationPercent}%`
  }

  const renderStatus = (status: GPUCardStatus) => {
    const translatedStatusLabel = t(GpuStatusDisplayKeyMap[status])
    if (status === GPUCardStatus.Unassigned) {
      return (
        <div className="flex items-center gap-x-2">
          <span className="whitespace-nowrap text-status-warning">
            {translatedStatusLabel}
          </span>
          <WarningFilled className="icon-md shrink-0 text-status-warning" />
        </div>
      )
    }

    return translatedStatusLabel
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
          title={t('nodes.details.editGpuType')}
          type="plain"
          onClick={() => openResourceEditModal(row)}
          disabled={row.status.current === GPUCardStatus.InUse}
        />
      </CosOverflowMenu>
    )
  }

  const { expandedRowIdSet, onExpandChange } = useExpandedRowIdSet()

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

  const renderDetailsTable = (row: GpuResourceRow) => {
    const isExpandDisabled = isRowExpandDisabled(row)

    if (isExpandDisabled) return null

    return (
      <div className="flex w-full justify-between gap-x-4">
        <GpuDetails nodeName={node?.hostname ?? ''} row={row} />
        <CosTooltip
          hoverContent={{ message: t('nodes.details.fullViewModal.tooltip') }}
          placement="top-left"
        >
          <CosButton
            type="ghost"
            usage="icon-only"
            Icon={FullScreen}
            onClick={() => openResourceFullView(row)}
          />
        </CosTooltip>
      </div>
    )
  }

  return (
    <>
      <CosGeneralPanel
        leftSlot={
          <div className="primary-body3 text-functional-text">
            {t('nodes.details.gpuList.title')}
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
            label={t('nodes.details.gpuList.gpuCard')}
            property="name"
            emphasize={true}
          >
            {renderName}
          </GpuResourceTable.Column>
          <GpuResourceTable.Column
            label={t('nodes.details.gpuList.resourceType')}
            property="resourceType"
          >
            {renderResourceType}
          </GpuResourceTable.Column>
          <GpuResourceTable.Column
            label={t('nodes.details.gpuList.vramAllocation')}
            property="vram"
          >
            {(_, row) => renderVRamAllocation(row)}
          </GpuResourceTable.Column>
          <GpuResourceTable.Column
            label={t('nodes.details.gpuList.vramUtilization')}
            property="vram"
          >
            {(_, row) => renderVramUtilization(row)}
          </GpuResourceTable.Column>
          <GpuResourceTable.Column
            label={t('nodes.details.gpuList.gpuUtilization')}
            property="gpu"
          >
            {(_, row) => renderGpuUtilization(row)}
          </GpuResourceTable.Column>
          <GpuResourceTable.Column
            label={t('nodes.details.gpuList.pciAddress')}
            property="pciAddress"
          />
          <GpuResourceTable.Column
            label={t('nodes.details.gpuList.status')}
            property="status"
          >
            {(_, row) => renderStatus(row.status.current)}
          </GpuResourceTable.Column>
          <GpuResourceTable.Column
            label={t('nodes.details.gpuList.allocation')}
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
      {fullViewTarget && (
        <GpuDetailsFullViewModal
          isModalOpen={!!fullViewTarget}
          nodeName={node?.hostname ?? ''}
          resource={fullViewTarget}
          onClose={closeResourceFullView}
        />
      )}
      {editTarget && (
        <EditGPUResourceModal
          isModalOpen={!!editTarget}
          nodeName={node?.hostname}
          resource={editTarget}
          onClose={closeResourceEditModal}
        />
      )}
    </>
  )
}

export default NodeGpuResources
