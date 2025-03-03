import { useState } from 'react'
import { GetMetricByTypesMetricTypeEnum } from '@cube-frontend/api'
import { CosDropdown, CosGeneralPanel } from '@cube-frontend/ui-library'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useInterval } from '@cube-frontend/web-app/hooks/useInterval'
import { useMetricsParams } from '../StoragePanels/useMetricsParams'
import { RankingChart } from './RankingChart/RankingChart'
import { CHART_PAGE_POLLING_INTERVAL, getRanking } from '../utils'

type VmRankingItem = {
  name: string
  metricType: GetMetricByTypesMetricTypeEnum
}

const vmRankingOptions = [
  {
    name: 'Cpu Usage',
    metricType: GetMetricByTypesMetricTypeEnum.CpuUsage,
  },
  {
    name: 'Memory Usage',
    metricType: GetMetricByTypesMetricTypeEnum.MemoryUsage,
  },
  {
    name: 'Disk IO Read',
    metricType: GetMetricByTypesMetricTypeEnum.DiskReadIops,
  },
  {
    name: 'Disk IO Write',
    metricType: GetMetricByTypesMetricTypeEnum.DiskWriteIops,
  },
  {
    name: 'Ingress Traffic',
    metricType: GetMetricByTypesMetricTypeEnum.NetworkTrafficIn,
  },
  {
    name: 'Egress Traffic',
    metricType: GetMetricByTypesMetricTypeEnum.NetworkTrafficOut,
  },
] satisfies VmRankingItem[]

export const VmRankingPanel = () => {
  const [selectedItems, setSelectedItems] = useState<VmRankingItem[]>([
    vmRankingOptions[0],
  ])

  const handleItemClick = (item: VmRankingItem) => {
    setSelectedItems([item])
  }

  const getMetricsParams = useMetricsParams()

  const {
    data: ranking = { rank: [], unit: '' },
    isLoading,
    hasResponseBeenReceived,
    getResource,
  } = useCosGetRequest(
    getRanking,
    getMetricsParams({
      entityType: 'vms',
      metricType: selectedItems[0].metricType,
      viewType: 'rank',
    }),
  )

  useInterval(getResource, CHART_PAGE_POLLING_INTERVAL)

  const showLoading = !hasResponseBeenReceived && isLoading

  return (
    <CosGeneralPanel
      topic="VM Ranking Top 10 (High to low)"
      className="flex-1"
      dropdown={
        <CosDropdown selectedItems={selectedItems}>
          <CosDropdown.Trigger>{selectedItems[0].name}</CosDropdown.Trigger>
          <CosDropdown.Menu>
            {vmRankingOptions.map((item) => (
              <CosDropdown.Item
                key={item.metricType}
                item={item}
                onClick={() => handleItemClick(item)}
              >
                {item.name}
              </CosDropdown.Item>
            ))}
          </CosDropdown.Menu>
        </CosDropdown>
      }
    >
      <RankingChart ranking={ranking} isLoading={showLoading} />
    </CosGeneralPanel>
  )
}
