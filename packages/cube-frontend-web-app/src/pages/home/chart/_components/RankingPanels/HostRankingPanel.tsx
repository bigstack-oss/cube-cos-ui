import { noop } from 'lodash'
import { useState } from 'react'
import { GetMetricByTypesMetricTypeEnum } from '@cube-frontend/api'
import { CosDropdown, CosGeneralPanel } from '@cube-frontend/ui-library'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useInterval } from '@cube-frontend/web-app/hooks/useInterval'
import { useMetricsParams } from '../StoragePanels/useMetricsParams'
import { CHART_PAGE_POLLING_INTERVAL, getRanking } from '../utils'
import { RankingChart } from './RankingChart/RankingChart'

type HostRankingItem = {
  name: string
  metricType: GetMetricByTypesMetricTypeEnum
}

const hostRankingOptions = [
  {
    name: 'Cpu Usage',
    metricType: GetMetricByTypesMetricTypeEnum.CpuUsage,
  },
  {
    name: 'Memory Usage',
    metricType: GetMetricByTypesMetricTypeEnum.MemoryUsage,
  },
  {
    name: 'Disk Usage',
    metricType: GetMetricByTypesMetricTypeEnum.DiskUsage,
  },
  {
    name: 'Ingress Traffic',
    metricType: GetMetricByTypesMetricTypeEnum.NetworkTrafficIn,
  },
  {
    name: 'Egress Traffic',
    metricType: GetMetricByTypesMetricTypeEnum.NetworkTrafficOut,
  },
] satisfies HostRankingItem[]

export const HostRankingPanel = () => {
  const [selectedItems, setSelectedItems] = useState<HostRankingItem[]>([
    hostRankingOptions[0],
  ])

  const handleItemClick = (item: HostRankingItem) => {
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
      entityType: 'hosts',
      metricType: selectedItems[0].metricType,
      viewType: 'rank',
    }),
  )

  useInterval(getResource, CHART_PAGE_POLLING_INTERVAL, { immediate: false })

  const showLoading = !hasResponseBeenReceived && isLoading

  return (
    <CosGeneralPanel.Container className="flex-1">
      <CosGeneralPanel.TitleBar
        title="Ranking"
        hyperLinkProps={{
          children: 'More ranking on Grafana',
          // TODO: We need the backend API to provide the link.
          onClick: noop,
        }}
      />
      <CosGeneralPanel
        className="flex-1"
        topic="Host Ranking Top 10 (High to low)"
        dropdown={
          <CosDropdown selectedItems={selectedItems}>
            <CosDropdown.Trigger>{selectedItems[0].name}</CosDropdown.Trigger>
            <CosDropdown.Menu>
              {hostRankingOptions.map((item) => (
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
    </CosGeneralPanel.Container>
  )
}
