import { GetNodesResponseData } from '@cube-frontend/api'
import {
  CosProgressBar,
  CosStatus,
  CosTag,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { useEffect, useState } from 'react'
import { CosPanel } from '../CosPanel/CosPanel'
import { nodesApi } from '@cube-frontend/web-app/utils/cosApi'

const dataCenter = 'dell13'

export const NodeTable =
  GetCosBasicTable<GetNodesResponseData['nodes'][number]>()

export const NodePanel = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [nodesData, setNodesData] = useState<GetNodesResponseData | undefined>()

  useEffect(() => {
    nodesApi.getNodes(dataCenter, 1, 10).then((res) => {
      setNodesData(res.data.data)
      setIsLoading(false)
    })
  }, [])

  return (
    <CosPanel title="Nodes">
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
        {/* <BaseNodeTable.Column label="License Expire" property="licenseExpire">
        {(licenseExpire) => licenseExpire.toLocaleDateString('en-US')}
      </BaseNodeTable.Column> */}
        <NodeTable.Column label="CPU" property="vcpu">
          {(cpu) => (
            <CosProgressBar color="bg-chart-1" progress={cpu?.usedCores} />
          )}
        </NodeTable.Column>
        <NodeTable.Column label="RAM" property="ram">
          {(ram) => <CosProgressBar color="bg-chart-2" progress={ram} />}
        </NodeTable.Column>
        <NodeTable.Column label="Partition" property="storage">
          {(storage) => (
            <CosProgressBar color="bg-chart-3" progress={storage?.usedMiB} />
          )}
        </NodeTable.Column>
        <NodeTable.Column label="Running" property="uptime" />
        {/* <BaseNodeTable.Column label="Running" property="running">
        {(running) => `${running.toLocaleString('en-US')} days`}
      </BaseNodeTable.Column> */}
        <NodeTable.Column label="Status" property="status">
          {(status) => <CosStatus status={status} />}
        </NodeTable.Column>
      </NodeTable>
    </CosPanel>
  )
}
