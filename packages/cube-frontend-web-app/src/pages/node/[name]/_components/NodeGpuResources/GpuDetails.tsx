import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ListNodeGPUCardsResponseDataInnerAttachedInstancesInner } from '@cube-frontend/api'
import { GetInfoTable } from '@cube-frontend/web-app/components/InfoTable/InfoTable'
import {
  toReadableSizeString,
  toReadableUsedSize,
} from '@cube-frontend/web-app/utils/byte'
import { CosHyperlink } from '@cube-frontend/ui-library'
import {
  GpuResourceRow,
  GPUProfileRow,
  getProfilesByResourceType,
} from './utils'

const GpuProfilesInfoTable = GetInfoTable<GPUProfileRow>()

const GpuAttachedInstanceInfoTable =
  GetInfoTable<ListNodeGPUCardsResponseDataInnerAttachedInstancesInner>()

export type GpuDetailsProps = {
  row: GpuResourceRow
}

const GpuDetails = (props: GpuDetailsProps) => {
  const { row } = props

  const { t } = useTranslation()

  const profiles = useMemo(() => getProfilesByResourceType(row), [row])

  const profileCount = profiles?.length ?? 0
  const profileTitle = `${t('nodes.details.profilesIdList.title')} (${profileCount})`

  const attachedInstanceCount = row.attachedInstances?.length ?? 0
  const attachedInstanceTitle = `${t('nodes.details.attachedInstancesList.title')} (${attachedInstanceCount})`

  const renderAttachedInstanceMemoryUsage = (
    memory: ListNodeGPUCardsResponseDataInnerAttachedInstancesInner['memoryUsage'],
  ) => {
    const { total, used, sizeUnit } = toReadableUsedSize({
      used: memory.allocatedMiB,
      total: memory.totalMiB,
      originalSizeUnit: 'MiB',
    })
    return `${used} ${sizeUnit} / ${total} ${sizeUnit}`
  }

  const renderAttachedInstanceActions = (
    row: ListNodeGPUCardsResponseDataInnerAttachedInstancesInner,
  ) => {
    return (
      <div className="flex w-full flex-row gap-x-4">
        <CosHyperlink
          size="sm"
          variant="text-inline"
          href={row.links.console}
          target="_blank"
        >
          {t('nodes.details.attachedInstancesList.console')}
        </CosHyperlink>
        <CosHyperlink
          size="sm"
          variant="text-inline"
          href={row.links.grafana}
          target="_blank"
        >
          Grafana
        </CosHyperlink>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-9">
      {profiles.length > 0 && (
        <GpuProfilesInfoTable
          title={profileTitle}
          rows={profiles}
          isLoading={false}
          scrollBehavior="horizontal"
        >
          <GpuProfilesInfoTable.Column property="name" />
          <GpuProfilesInfoTable.Column
            label={t('nodes.details.profilesIdList.vram')}
            property="vramMiB"
          >
            {(vramMiB) => toReadableSizeString(vramMiB, 'MiB')}
          </GpuProfilesInfoTable.Column>
          <GpuProfilesInfoTable.Column
            label={t('nodes.details.profilesIdList.counts')}
            property="count"
          />
          <GpuProfilesInfoTable.Column
            label={t('nodes.details.profilesIdList.remaining')}
            property="remaining"
          />
          <GpuProfilesInfoTable.Column
            label={t('nodes.details.profilesIdList.aliasName')}
            property="aliasName"
          />
        </GpuProfilesInfoTable>
      )}
      {attachedInstanceCount > 0 && (
        <GpuAttachedInstanceInfoTable
          title={attachedInstanceTitle}
          rows={row.attachedInstances || []}
          isLoading={false}
          scrollBehavior="horizontal"
        >
          <GpuAttachedInstanceInfoTable.Column property="name" />
          {row.resourceType !== 'pgpu' && (
            <GpuAttachedInstanceInfoTable.Column
              label={t('nodes.details.attachedInstancesList.alias')}
              property="profileAlias"
            />
          )}
          <GpuAttachedInstanceInfoTable.Column
            label={t('nodes.details.attachedInstancesList.utilization')}
            property="utilizationPercent"
          >
            {(utilizationPercent) => `${utilizationPercent} %`}
          </GpuAttachedInstanceInfoTable.Column>
          <GpuAttachedInstanceInfoTable.Column
            label={t('nodes.details.attachedInstancesList.memory')}
            property="memoryUsage"
          >
            {(memory) => renderAttachedInstanceMemoryUsage(memory)}
          </GpuAttachedInstanceInfoTable.Column>
          <GpuAttachedInstanceInfoTable.Column
            label={t('nodes.details.attachedInstancesList.action')}
            property="name"
          >
            {(_, row) => renderAttachedInstanceActions(row)}
          </GpuAttachedInstanceInfoTable.Column>
        </GpuAttachedInstanceInfoTable>
      )}
    </div>
  )
}

export default GpuDetails
