import { useContext, useState } from 'react'
import {
  GetMetricByTypesMetricTypeEnum,
  GrafanaApiGetGrafanaTopInstancesRequest,
} from '@cube-frontend/api'
import { CosDropdown, CosGeneralPanel } from '@cube-frontend/ui-library'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { shouldDisplayLoading } from '@cube-frontend/web-app/utils/loadingDisplay'
import { useMetricsParams } from '../StoragePanels/useMetricsParams'
import {
  CHART_PAGE_POLLING_INTERVAL,
  computeTitleBarHyperlinkProps,
  getRanking,
} from '../utils'
import { RankingChart } from './RankingChart/RankingChart'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { grafanaApi } from '@cube-frontend/web-app/api/cosApi'

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
  const { dataCenter } = useContext(DataCenterContext)

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

  const { isPolling } = usePolling(getResource, CHART_PAGE_POLLING_INTERVAL)

  const showLoading = shouldDisplayLoading({
    isLoading,
    isPolling,
    hasResponseBeenReceived,
  })

  const { data: grafanaLinkResponse } = useCosGetRequest(
    grafanaApi.getGrafanaTopInstances,
    (): GrafanaApiGetGrafanaTopInstancesRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  return (
    <CosGeneralPanel.Container className="flex-1">
      <CosGeneralPanel.TitleBar
        title="Instance"
        hyperLinkProps={computeTitleBarHyperlinkProps(grafanaLinkResponse)}
      />
      <CosGeneralPanel
        className="flex-1"
        topic="VM Ranking Top 10 (High to low)"
        dropdown={
          <CosDropdown type="radio" selectedItems={selectedItems}>
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
    </CosGeneralPanel.Container>
  )
}
