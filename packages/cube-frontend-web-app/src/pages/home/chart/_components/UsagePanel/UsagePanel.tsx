import { GetMetricsResponseData } from '@cube-frontend/api'
import { CosGeneralPanel, CosStroke } from '@cube-frontend/ui-library'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useContext, useMemo } from 'react'
import { UsageMetricsItem } from './UsageMetricsItem'
import { metricsToRoleGroups, RoleGroup } from './usagePanelUtils'
import { useTranslation } from 'react-i18next'

export type UsagePanelProps = {
  metrics: GetMetricsResponseData
  isLoading: boolean
}

export const UsagePanel = (props: UsagePanelProps) => {
  const { metrics, isLoading } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { t } = useTranslation()

  const roleGroups = useMemo<RoleGroup[]>(
    () => metricsToRoleGroups(metrics, dataCenter!.type, t),
    [metrics, dataCenter, t],
  )

  return (
    <CosGeneralPanel topic={t('home.chart.usage.title')}>
      <div className="flex flex-col gap-y-4">
        <UsageMetricsItem
          name={t('home.chart.usage.dataCenter')}
          cpuUsedPercent={metrics.dataCenter.usage.cpu.usedPercent}
          memoryUsedPercent={metrics.dataCenter.usage.memory.usedPercent}
          isLoading={isLoading}
        />
        <CosStroke />
        {roleGroups.map((roleGroup, index) => (
          <div key={index} className="flex items-center gap-x-4">
            {roleGroup.map((roleUsage) => (
              <UsageMetricsItem
                key={roleUsage.name}
                nodeCount={roleUsage.value.count}
                name={roleUsage.name}
                cpuUsedPercent={roleUsage.value.cpu.usedPercent}
                memoryUsedPercent={roleUsage.value.memory.usedPercent}
                isLoading={isLoading}
              />
            ))}
          </div>
        ))}
      </div>
    </CosGeneralPanel>
  )
}
