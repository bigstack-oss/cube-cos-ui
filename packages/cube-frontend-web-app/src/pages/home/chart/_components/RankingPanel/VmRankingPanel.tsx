import { GetMetricByTypesMetricTypeEnum } from '@cube-frontend/api'
import { CosDropdown, CosGeneralPanel } from '@cube-frontend/ui-library'
import { useState } from 'react'
import { useCosStreamRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosStreamRequest'
import { RankItem } from './RankItem'
import { useMetricsParams } from '../StoragePanel/utils'
import { getRanking } from '../utils'

type VmRankingItem = {
  name: string
  metricType: GetMetricByTypesMetricTypeEnum
}

const vmRankings = [
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
    vmRankings[0],
  ])

  const handleItemClick = (item: VmRankingItem) => {
    setSelectedItems([item])
  }

  const getMetricsParams = useMetricsParams()

  const { data, isLoading } = useCosStreamRequest(
    getRanking,
    getMetricsParams({
      entityType: 'vms',
      metricType: selectedItems[0].metricType,
      viewType: 'rank',
    }),
  )

  return (
    <CosGeneralPanel
      topic="VM Ranking Top 10 (High to low)"
      className="flex-1"
      dropdown={
        <CosDropdown selectedItems={selectedItems}>
          <CosDropdown.Trigger>{selectedItems[0].name}</CosDropdown.Trigger>
          <CosDropdown.Menu>
            {vmRankings.map((item) => (
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
      {isLoading && <div>Loading...</div>}
      {data && (
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-3">
            {data.rank.map((item) => (
              <RankItem key={item.id} item={item} unit={data.unit} />
            ))}
          </div>
        </div>
      )}
    </CosGeneralPanel>
  )
}
