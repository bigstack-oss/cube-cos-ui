import { GetNodesResponseData } from '@cube-frontend/api'
import {
  CosHyperlink,
  CosProgressBar,
  CosStatus,
  CosTag,
  CosTooltip,
  GetCosBatchActionTable,
} from '@cube-frontend/ui-library'
import {
  humanizeDuration,
  toLicenseDateDisplay,
} from '@cube-frontend/web-app/utils/date'
import { ipv4CompareFnMap } from '@cube-frontend/web-app/utils/ip'
import { toPercentage } from '@cube-frontend/web-app/utils/number'
import { noop } from 'lodash'
import { ComponentProps } from 'react'
import { Link } from 'react-router'
import { CopyButton } from '@cube-frontend/web-app/components/CopyButton'

const BatchActionNodeTable =
  GetCosBatchActionTable<GetNodesResponseData['nodes'][number]>()

export type NodeTableProps = ComponentProps<typeof BatchActionNodeTable>

export const NodeTable = (props: NodeTableProps) => {
  return (
    <BatchActionNodeTable {...props}>
      <BatchActionNodeTable.Column
        label="Hostname"
        property="hostname"
        emphasize={true}
      >
        {(hostname) => (
          <Link className="block w-fit" to={`/nodes/${hostname}`}>
            <CosHyperlink variant="text-only" onClick={noop}>
              {hostname}
            </CosHyperlink>
          </Link>
        )}
      </BatchActionNodeTable.Column>
      <BatchActionNodeTable.Column
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
              <CopyButton copyContent={managementIP} />
            </CosTooltip>
          </div>
        )}
      </BatchActionNodeTable.Column>
      <BatchActionNodeTable.Column label="Role" property="role">
        {(role) => (
          <CosTag color="blue" variant="filled">
            {role}
          </CosTag>
        )}
      </BatchActionNodeTable.Column>
      <BatchActionNodeTable.Column label="License Expire" property="license">
        {(license) => toLicenseDateDisplay(license.expiry.date)}
      </BatchActionNodeTable.Column>
      <BatchActionNodeTable.Column
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
      </BatchActionNodeTable.Column>
      <BatchActionNodeTable.Column
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
      </BatchActionNodeTable.Column>
      <BatchActionNodeTable.Column
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
      </BatchActionNodeTable.Column>
      <BatchActionNodeTable.Column label="Running" property="uptimeSeconds">
        {(uptimeSeconds) => humanizeDuration(uptimeSeconds)}
      </BatchActionNodeTable.Column>
      <BatchActionNodeTable.Column
        label="Status"
        property="status"
        skeletonVariant="status"
      >
        {(status) => <CosStatus status={status} />}
      </BatchActionNodeTable.Column>
    </BatchActionNodeTable>
  )
}
