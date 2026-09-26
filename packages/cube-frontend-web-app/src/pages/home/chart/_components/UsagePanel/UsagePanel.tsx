import { GetMetricsResponseData } from '@cube-frontend/api'
import { CosGeneralPanel, CosStroke } from '@cube-frontend/ui-library'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useContext, useMemo } from 'react'
import { UsageMetricsItem } from './UsageMetricsItem'
import { metricsToRoleUsages, RoleUsageItem } from './usagePanelUtils'
import { useTranslation } from 'react-i18next'

export type UsagePanelProps = {
  metrics: GetMetricsResponseData
  isLoading: boolean
}

export const UsagePanel = (props: UsagePanelProps) => {
  const { metrics, isLoading } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { t } = useTranslation()

  const registeredRoles = dataCenter!.registeredRoles

  const roleUsages = useMemo<RoleUsageItem[]>(
    () => metricsToRoleUsages(metrics, registeredRoles, t),
    [metrics, registeredRoles, t],
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
        {roleUsages.length > 0 && (
          <>
            <CosStroke />
            {/* A lone role spans the row like the data center item above. */}
            <div
              className={`grid gap-4 ${roleUsages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}
            >
              {roleUsages.map((roleUsage) => (
                <UsageMetricsItem
                  key={roleUsage.role}
                  nodeCount={roleUsage.value.count}
                  name={roleUsage.name}
                  cpuUsedPercent={roleUsage.value.cpu.usedPercent}
                  memoryUsedPercent={roleUsage.value.memory.usedPercent}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </CosGeneralPanel>
  )
}
