import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ListNodeGPUCardsResponseDataInnerAttachedInstancesInner } from '@cube-frontend/api'
import { GetInfoTable } from '@cube-frontend/web-app/components/InfoTable/InfoTable'
import {
  toReadableSizeString,
  toReadableUsedSize,
} from '@cube-frontend/web-app/utils/byte'
import {
  GpuResourceRow,
  GPUProfileRow,
  getProfilesByResourceType,
  isProfileRemainingSupported,
} from './utils'
import { GpuConsoleLink } from './GpuConsoleLink'
import { InstanceHistoryLinks } from './InstanceHistoryLinks'
import { UnmeasurableValue } from './UnmeasurableValue'

const GpuProfilesInfoTable = GetInfoTable<GPUProfileRow>()

const GpuAttachedInstanceInfoTable =
  GetInfoTable<ListNodeGPUCardsResponseDataInnerAttachedInstancesInner>()

export type GpuDetailsProps = {
  nodeName: string
  row: GpuResourceRow
}

const GpuDetails = (props: GpuDetailsProps) => {
  const { nodeName, row } = props

  const { t } = useTranslation()

  const profiles = useMemo(() => getProfilesByResourceType(row), [row])

  const profileCount = profiles?.length ?? 0
  const profileTitle = `${t('nodes.details.profilesIdList.title')} (${profileCount})`

  const attachedInstanceCount = row.attachedInstances?.length ?? 0
  const attachedInstanceTitle = `${t('nodes.details.attachedInstancesList.title')} (${attachedInstanceCount})`

  const renderAttachedInstanceMemoryUsage = (
    memory: ListNodeGPUCardsResponseDataInnerAttachedInstancesInner['memoryUsage'],
  ) => {
    const { allocatedMiB, totalMiB } = memory

    if (allocatedMiB == null || totalMiB == null) {
      return <UnmeasurableValue resourceType={row.resourceType} />
    }

    const { total, used, sizeUnit } = toReadableUsedSize({
      used: allocatedMiB,
      total: totalMiB,
      originalSizeUnit: 'MiB',
    })
    return `${used} ${sizeUnit} / ${total} ${sizeUnit}`
  }

  const renderAttachedInstanceActions = (
    instance: ListNodeGPUCardsResponseDataInnerAttachedInstancesInner,
  ) => {
    return (
      <div className="flex w-full flex-row gap-x-4">
        <GpuConsoleLink nodeName={nodeName} instanceId={instance.id} />
        <InstanceHistoryLinks
          resourceType={row.resourceType}
          links={instance.links}
        />
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
          {isProfileRemainingSupported(row.resourceType) && (
            <GpuProfilesInfoTable.Column
              label={t('nodes.details.profilesIdList.remaining')}
              property="remaining"
            />
          )}
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
            {(utilizationPercent) =>
              utilizationPercent == null ? (
                <UnmeasurableValue resourceType={row.resourceType} />
              ) : (
                `${utilizationPercent} %`
              )
            }
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
            {(_, instance) => renderAttachedInstanceActions(instance)}
          </GpuAttachedInstanceInfoTable.Column>
        </GpuAttachedInstanceInfoTable>
      )}
    </div>
  )
}

export default GpuDetails
