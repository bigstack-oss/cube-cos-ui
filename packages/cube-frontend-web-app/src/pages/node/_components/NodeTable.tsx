import { ComponentProps } from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { noop } from 'lodash'
import { GetNodesResponseData } from '@cube-frontend/api'
import {
  CosHyperlink,
  CosResourceUsageBar,
  CosTag,
  CosTooltip,
  GetCosBatchActionTable,
} from '@cube-frontend/ui-library'
import { CopyButton } from '@cube-frontend/web-app/components/CopyButton'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { toLicenseExpirationDate } from '@cube-frontend/web-app/utils/date'
import { ipv4CompareFnMap } from '@cube-frontend/web-app/utils/ip'
import {
  canCreateSupportFile,
  formatUpTime,
} from '@cube-frontend/web-app/utils/node'
import { VipLabel } from './VipLabel'
import { NodeStatus } from './NodeStatus'

const BatchActionNodeTable =
  GetCosBatchActionTable<GetNodesResponseData['nodes'][number]>()

export type NodeTableProps = ComponentProps<typeof BatchActionNodeTable>

export const NodeTable = (props: NodeTableProps) => {
  const { t } = useTranslation()

  return (
    <BatchActionNodeTable
      {...props}
      rowClassName={(row) =>
        // Overwrite the built-in gray text style in the batch action table
        // for disabled rows.
        !canCreateSupportFile(row) && '[&>td]:text-functional-text'
      }
    >
      <BatchActionNodeTable.Column
        label={t('nodes.hostname')}
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
      </BatchActionNodeTable.Column>
      <BatchActionNodeTable.Column
        label={t('nodes.managementIp')}
        property="managementIP"
        isSortable={true}
        sortingCompareFnMap={ipv4CompareFnMap}
        skeletonVariant="icon-right"
      >
        {(managementIP) => (
          <div className="flex items-center gap-x-1.5">
            <span className="w-[98px]">{managementIP}</span>
            <CosTooltip clickContent={{ message: t('nodes.copied') }}>
              <CopyButton copyContent={managementIP} />
            </CosTooltip>
          </div>
        )}
      </BatchActionNodeTable.Column>
      <BatchActionNodeTable.Column label={t('nodes.role')} property="role">
        {(role) => (
          <CosTag color="blue" variant="filled">
            {role}
          </CosTag>
        )}
      </BatchActionNodeTable.Column>
      <BatchActionNodeTable.Column
        label={t('nodes.licenseExpiration')}
        property="license"
      >
        {(license) => toLicenseExpirationDate(license, t)}
      </BatchActionNodeTable.Column>
      <BatchActionNodeTable.Column
        label={t('nodes.cpu')}
        property="vcpu"
        skeletonVariant="with-barchart"
      >
        {(cpu) => (
          <CosResourceUsageBar
            className="min-w-[90px]"
            progress={cpu.usedPercent}
          />
        )}
      </BatchActionNodeTable.Column>
      <BatchActionNodeTable.Column
        label={t('nodes.ram')}
        property="memory"
        skeletonVariant="with-barchart"
      >
        {(memory) => (
          <CosResourceUsageBar
            className="min-w-[90px]"
            progress={memory.usedPercent}
          />
        )}
      </BatchActionNodeTable.Column>
      <BatchActionNodeTable.Column
        label={t('nodes.diskUsage')}
        property="storage"
        skeletonVariant="with-barchart"
      >
        {(storage) => (
          <CosResourceUsageBar
            className="min-w-[90px]"
            progress={storage.usedPercent}
          />
        )}
      </BatchActionNodeTable.Column>
      <BatchActionNodeTable.Column
        label={t('nodes.running')}
        property="uptimeSeconds"
      >
        {(_, node) => (
          <span className="whitespace-nowrap">{formatUpTime(t, node)}</span>
        )}
      </BatchActionNodeTable.Column>
      <BatchActionNodeTable.Column
        label={t('nodes.status')}
        property="status"
        skeletonVariant="status"
      >
        {(status) => <NodeStatus status={status} />}
      </BatchActionNodeTable.Column>
    </BatchActionNodeTable>
  )
}
