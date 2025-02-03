import {
  ColumnCompareFnMap,
  CosStatus,
  CosTag,
} from '@cube-frontend/ui-library'
import { CosProgressBar } from '../../../../internal/components/CosProgressBar/CosProgressBar'
import { mockNodes, NodeTable } from './utils'

// Sorted in ascending order: running -> success -> error (descending is reversed).
const statuses: string[] = ['running', 'success', 'error']

const statusCompareFnMap: ColumnCompareFnMap<string> = {
  ascending: (precedingStatus, followingStatus) => {
    const precedingStatusIndex = statuses.indexOf(precedingStatus) ?? 100
    const followingStatusIndex = statuses.indexOf(followingStatus) ?? 100
    return precedingStatusIndex <= followingStatusIndex
  },
  descending: (precedingStatus, followingStatus) => {
    const precedingStatusIndex = statuses.indexOf(precedingStatus) ?? 100
    const followingStatusIndex = statuses.indexOf(followingStatus) ?? 100
    return precedingStatusIndex >= followingStatusIndex
  },
}

export const CustomSortingRule = () => (
  <NodeTable rows={mockNodes}>
    <NodeTable.Column label="Hostname" property="hostname" emphasize={true} />
    <NodeTable.Column label="Management IP" property="managementIp" />
    <NodeTable.Column label="Role" property="role">
      {(role) => (
        <CosTag color="blue" variant="filled">
          {role}
        </CosTag>
      )}
    </NodeTable.Column>
    <NodeTable.Column label="License Expire" property="licenseExpire">
      {(licenseExpire) => licenseExpire.toLocaleDateString('en-US')}
    </NodeTable.Column>
    <NodeTable.Column label="CPU" property="cpu">
      {(cpu) => <CosProgressBar color="bg-chart-1" progress={cpu} />}
    </NodeTable.Column>
    <NodeTable.Column label="RAM" property="ram">
      {(ram) => <CosProgressBar color="bg-chart-2" progress={ram} />}
    </NodeTable.Column>
    <NodeTable.Column label="Partition" property="partition">
      {(partition) => (
        <CosProgressBar color="bg-chart-3" progress={partition} />
      )}
    </NodeTable.Column>
    <NodeTable.Column label="Running" property="running">
      {(running) => `${running.toLocaleString('en-US')} days`}
    </NodeTable.Column>
    <NodeTable.Column
      label="Status"
      property="status"
      isSortable={true}
      sortingCompareFnMap={statusCompareFnMap}
    >
      {(status) => <CosStatus status={status} />}
    </NodeTable.Column>
  </NodeTable>
)
