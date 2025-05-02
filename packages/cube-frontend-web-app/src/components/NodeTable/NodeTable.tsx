import { GetNodesResponseData } from '@cube-frontend/api'
import {
  CosProgressBar,
  CosStatus,
  CosTag,
  CosTooltip,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import CopyIcon from '@cube-frontend/ui-library/icons/monochrome/copy.svg?react'
import {
  humanizeDuration,
  toLicenseDateDisplay,
} from '@cube-frontend/web-app/utils/date'
import { ipv4CompareFnMap } from '@cube-frontend/web-app/utils/ip'
import { toPercentage } from '@cube-frontend/web-app/utils/number'

export const BasicNodeTable =
  GetCosBasicTable<GetNodesResponseData['nodes'][number]>()

export type NodeTableProps = React.ComponentProps<typeof BasicNodeTable>

export const NodeTable = (props: NodeTableProps) => {
  return (
    <BasicNodeTable {...props}>
      <BasicNodeTable.Column
        label="Hostname"
        property="hostname"
        emphasize={true}
      />
      <BasicNodeTable.Column
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
      </BasicNodeTable.Column>
      <BasicNodeTable.Column label="Role" property="role">
        {(role) => (
          <CosTag color="blue" variant="filled">
            {role}
          </CosTag>
        )}
      </BasicNodeTable.Column>
      <BasicNodeTable.Column label="License Expiration" property="license">
        {(license) => toLicenseDateDisplay(license.expiry.date)}
      </BasicNodeTable.Column>
      <BasicNodeTable.Column
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
      </BasicNodeTable.Column>
      <BasicNodeTable.Column
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
      </BasicNodeTable.Column>
      <BasicNodeTable.Column
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
      </BasicNodeTable.Column>
      <BasicNodeTable.Column label="Running" property="uptimeSeconds">
        {(uptimeSeconds) => humanizeDuration(uptimeSeconds)}
      </BasicNodeTable.Column>
      <BasicNodeTable.Column
        label="Status"
        property="status"
        skeletonVariant="status"
      >
        {(status) => <CosStatus status={status} />}
      </BasicNodeTable.Column>
    </BasicNodeTable>
  )
}
