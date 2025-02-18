import {
  GetNodesResponseData,
  NodesApiGetNodesRequest,
} from '@cube-frontend/api'
import {
  CosInput,
  CosPanel,
  CosProgressBar,
  CosStatus,
  CosTag,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { useContext, useState } from 'react'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosStreamRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosStreamRequest'

const toPercentage = (used: number, total: number) => {
  return Math.floor(used / total) * 100
}

export const NodeTable =
  GetCosBasicTable<GetNodesResponseData['nodes'][number]>()

// Implement the NodePanel component according to the COS design guideline.
export const NodePanel = () => {
  const dataCenter = useContext(DataCenterContext)

  const [pageSize, setPageSize] = useState(10)
  const {
    data: nodesData,
    isLoading,
    errorState,
  } = useCosStreamRequest(nodesApi.getNodes, () => {
    if (!dataCenter.name) return

    const req: NodesApiGetNodesRequest = {
      dataCenter: dataCenter.name,
      pageNum: 1,
      pageSize,
    }

    return req
  })

  return (
    <CosPanel title="Nodes">
      {errorState && <div>{errorState.native.message}</div>}
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
        />
        <NodeTable.Column label="Role" property="role">
          {(role) => (
            <CosTag color="blue" variant="filled">
              {role}
            </CosTag>
          )}
        </NodeTable.Column>
        <NodeTable.Column label="CPU" property="vcpu">
          {(cpu) => (
            <CosProgressBar color="bg-chart-1" progress={cpu.usedCores} />
          )}
        </NodeTable.Column>
        <NodeTable.Column label="RAM" property="memory">
          {(memory) => (
            <CosProgressBar
              color="bg-chart-2"
              progress={toPercentage(memory.usedMiB, memory.totalMiB)}
            />
          )}
        </NodeTable.Column>
        <NodeTable.Column label="Partition" property="storage">
          {(storage) => (
            <CosProgressBar
              color="bg-chart-3"
              progress={toPercentage(storage.usedMiB, storage.totalMiB)}
            />
          )}
        </NodeTable.Column>
        <NodeTable.Column label="Running" property="uptimeSeconds">
          {(updateSeconds) => `${Math.floor(updateSeconds / 86400)} days`}
        </NodeTable.Column>
        <NodeTable.Column label="Status" property="status">
          {(status) => <CosStatus status={status} />}
        </NodeTable.Column>
      </NodeTable>
      <div className="flex items-center gap-x-4 p-4">
        <span>Page Size</span>
        <CosInput
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        />
      </div>
    </CosPanel>
  )
}
