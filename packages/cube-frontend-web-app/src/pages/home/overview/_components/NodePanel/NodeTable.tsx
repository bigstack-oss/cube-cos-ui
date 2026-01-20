import { GetNodesResponseData } from '@cube-frontend/api'
import {
  CosHyperlink,
  CosResourceUsageBar,
  CosTag,
  CosTooltip,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { CopyButton } from '@cube-frontend/web-app/components/CopyButton'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { NodeStatus } from '@cube-frontend/web-app/pages/node/_components/NodeStatus'
import { VipLabel } from '@cube-frontend/web-app/pages/node/_components/VipLabel'
import { toLicenseExpirationDate } from '@cube-frontend/web-app/utils/date'
import { ipv4CompareFnMap } from '@cube-frontend/web-app/utils/ip'
import { formatUpTime } from '@cube-frontend/web-app/utils/node'
import { noop } from 'lodash'
import { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

const BasicNodeTable = GetCosBasicTable<GetNodesResponseData['nodes'][number]>()

export type NodeTableProps = ComponentProps<typeof BasicNodeTable>

export const NodeTable = (props: NodeTableProps) => {
  const { t } = useTranslation()

  return (
    <BasicNodeTable {...props}>
      <BasicNodeTable.Column
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
      </BasicNodeTable.Column>
      <BasicNodeTable.Column
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
      </BasicNodeTable.Column>
      <BasicNodeTable.Column label={t('nodes.role')} property="role">
        {(role) => (
          <CosTag color="blue" variant="filled">
            {t(`common.node.roles.${role}`)}
          </CosTag>
        )}
      </BasicNodeTable.Column>
      <BasicNodeTable.Column
        label={t('nodes.licenseExpiration')}
        property="license"
      >
        {(license) => toLicenseExpirationDate(license, t)}
      </BasicNodeTable.Column>
      <BasicNodeTable.Column
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
      </BasicNodeTable.Column>
      <BasicNodeTable.Column
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
      </BasicNodeTable.Column>
      <BasicNodeTable.Column
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
      </BasicNodeTable.Column>
      <BasicNodeTable.Column
        label={t('nodes.running')}
        property="uptimeSeconds"
      >
        {(_, node) => (
          <span className="whitespace-nowrap">{formatUpTime(t, node)}</span>
        )}
      </BasicNodeTable.Column>
      <BasicNodeTable.Column
        label={t('nodes.status')}
        property="status"
        skeletonVariant="status"
      >
        {(status) => <NodeStatus status={status} />}
      </BasicNodeTable.Column>
    </BasicNodeTable>
  )
}
