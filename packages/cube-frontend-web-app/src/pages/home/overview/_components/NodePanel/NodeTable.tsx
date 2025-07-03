import { GetNodesResponseData } from '@cube-frontend/api'
import {
  CosHyperlink,
  CosProgressBar,
  CosStatus,
  CosTag,
  CosTooltip,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { CopyButton } from '@cube-frontend/web-app/components/CopyButton'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { VipLabel } from '@cube-frontend/web-app/pages/node/_components/VipLabel'
import { toLicenseExpirationDate } from '@cube-frontend/web-app/utils/date'
import { ipv4CompareFnMap } from '@cube-frontend/web-app/utils/ip'
import { formatUpTime } from '@cube-frontend/web-app/utils/node'
import { noop } from 'lodash'
import { ComponentProps } from 'react'
import { Link } from 'react-router'

const BasicNodeTable = GetCosBasicTable<GetNodesResponseData['nodes'][number]>()

export type NodeTableProps = ComponentProps<typeof BasicNodeTable>

export const NodeTable = (props: NodeTableProps) => {
  return (
    <BasicNodeTable {...props}>
      <BasicNodeTable.Column
        label="Hostname"
        property="hostname"
        emphasize={true}
      >
        {(hostname, node) => (
          <div className="flex items-center gap-x-2">
            <Link
              className="block w-fit"
              to={CosRoutesEnum.NODE_DETAIL_PAGE(hostname)}
            >
              <CosHyperlink variant="text-only" onClick={noop}>
                {hostname}
              </CosHyperlink>
            </Link>
            {node.isVirtualIpOwner && <VipLabel />}
          </div>
        )}
      </BasicNodeTable.Column>
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
              <CopyButton copyContent={managementIP} />
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
        {(license) => toLicenseExpirationDate(license)}
      </BasicNodeTable.Column>
      <BasicNodeTable.Column
        label="CPU"
        property="vcpu"
        skeletonVariant="with-barchart"
      >
        {(cpu) => (
          <CosProgressBar className="min-w-[90px]" progress={cpu.usedPercent} />
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
            progress={memory.usedPercent}
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
            progress={storage.usedPercent}
          />
        )}
      </BasicNodeTable.Column>
      <BasicNodeTable.Column label="Running" property="uptimeSeconds">
        {(_, node) => (
          <span className="whitespace-nowrap">{formatUpTime(node)}</span>
        )}
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
