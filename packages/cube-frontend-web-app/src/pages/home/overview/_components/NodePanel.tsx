import { useContext } from 'react'
import {
  GetNodesResponseData,
  NodesApiGetNodesRequest,
} from '@cube-frontend/api'
import {
  CosDashboardPanel,
  CosProgressBar,
  CosStatus,
  CosTag,
  CosTooltip,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import CopyIcon from '@cube-frontend/ui-library/icons/monochrome/copy.svg?react'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useUpdateTime } from '@cube-frontend/web-app/hooks/useUpdateTime'
import { useCosStreamRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosStreamRequest'
import {
  humanizeDuration,
  toLicenseDateDisplay,
} from '@cube-frontend/web-app/utils/date'
import { ipv4CompareFnMap } from '@cube-frontend/web-app/utils/ip'
import { toPercentage } from '@cube-frontend/web-app/utils/number'

const HOME_PAGE_NODE_ROW_LIMIT = 5

export const NodeTable =
  GetCosBasicTable<GetNodesResponseData['nodes'][number]>()

export const NodePanel = () => {
  const dataCenter = useContext(DataCenterContext)

  const { data: nodesData, isLoading } = useCosStreamRequest(
    nodesApi.getNodes,
    () => {
      if (!dataCenter.name) return

      return {
        dataCenter: dataCenter.name,
        pageNum: 1,
        pageSize: HOME_PAGE_NODE_ROW_LIMIT,
      } satisfies NodesApiGetNodesRequest
    },
  )

  const updateTime = useUpdateTime(nodesData, isLoading)

  return (
    <CosDashboardPanel
      title="Nodes"
      time={updateTime}
      hyperLinkProps={{ href: '/nodes' }}
      useContentWrapper={false}
      isTimeLoading={isLoading}
    >
      <NodeTable rows={nodesData?.nodes || []} isLoading={isLoading}>
        <NodeTable.Column
          label="Hostname"
          property="hostname"
          emphasize={true}
        />
        <NodeTable.Column
          label="Management IP"
          property="managementIP"
          isSortable={true}
          sortingCompareFnMap={ipv4CompareFnMap}
          skeletonVariant="icon-right"
        >
          {(managementIP) => (
            <div className="flex items-center gap-x-1.5">
              <span className="w-[98px]">{managementIP}</span>
              <CosTooltip clickContent={{ message: 'Copied' }}>
                <button
                  onClick={() => navigator.clipboard.writeText(managementIP)}
                >
                  <CopyIcon className="icon-md" />
                </button>
              </CosTooltip>
            </div>
          )}
        </NodeTable.Column>
        <NodeTable.Column label="Role" property="role">
          {(role) => (
            <CosTag color="blue" variant="filled">
              {role}
            </CosTag>
          )}
        </NodeTable.Column>
        <NodeTable.Column label="License Expire" property="license">
          {(license) => toLicenseDateDisplay(license.expiry.date)}
        </NodeTable.Column>
        <NodeTable.Column
          label="CPU"
          property="vcpu"
          skeletonVariant="with-barchart"
        >
          {(cpu) => (
            <CosProgressBar
              className="min-w-[90px]"
              color="bg-chart-1"
              progress={toPercentage(cpu.usedCores, cpu.totalCores)}
            />
          )}
        </NodeTable.Column>
        <NodeTable.Column
          label="RAM"
          property="memory"
          skeletonVariant="with-barchart"
        >
          {(memory) => (
            <CosProgressBar
              className="min-w-[90px]"
              color="bg-chart-2"
              progress={toPercentage(memory.usedMiB, memory.totalMiB)}
            />
          )}
        </NodeTable.Column>
        <NodeTable.Column
          label="Partition"
          property="storage"
          skeletonVariant="with-barchart"
        >
          {(storage) => (
            <CosProgressBar
              className="min-w-[90px]"
              color="bg-chart-3"
              progress={toPercentage(storage.usedMiB, storage.totalMiB)}
            />
          )}
        </NodeTable.Column>
        <NodeTable.Column label="Running" property="uptimeSeconds">
          {(uptimeSeconds) => humanizeDuration(uptimeSeconds)}
        </NodeTable.Column>
        <NodeTable.Column
          label="Status"
          property="status"
          skeletonVariant="status"
        >
          {(status) => <CosStatus status={status} />}
        </NodeTable.Column>
      </NodeTable>
    </CosDashboardPanel>
  )
}
