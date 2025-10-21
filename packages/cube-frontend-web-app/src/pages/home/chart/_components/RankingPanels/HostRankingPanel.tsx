import { useContext, useState } from 'react'
import {
  GetMetricByTypesMetricTypeEnum,
  GrafanaApiGetGrafanaTopHostsRequest,
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
import { useTranslation } from 'react-i18next'
import { HostRankingItem, useHostRankingOptions } from './useHostRankingOptions'

export const HostRankingPanel = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const hostRankingOptions = useHostRankingOptions()

  const [selectedMetricTypes, setSelectedMetricTypes] = useState<
    GetMetricByTypesMetricTypeEnum[]
  >(() => [hostRankingOptions[0].metricType])

  const selectedMetricTypeDisplay = hostRankingOptions.find(
    (item) => item.metricType === selectedMetricTypes[0],
  )?.name

  const handleItemClick = (item: HostRankingItem) => {
    setSelectedMetricTypes([item.metricType])
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
      metricType: selectedMetricTypes[0],
      viewType: 'rank',
    }),
  )

  const { isPolling } = usePolling(getResource, CHART_PAGE_POLLING_INTERVAL)

  const showLoading = shouldDisplayLoading({
    hasResponseBeenReceived,
    isLoading,
    isPolling,
  })

  const { data: grafanaLinkResponse } = useCosGetRequest(
    grafanaApi.getGrafanaTopHosts,
    (): GrafanaApiGetGrafanaTopHostsRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  const { t } = useTranslation()

  return (
    <CosGeneralPanel.Container className="flex-1">
      <CosGeneralPanel.TitleBar
        title={t('home.chart.host.title')}
        hyperLinkProps={computeTitleBarHyperlinkProps(grafanaLinkResponse, t)}
      />
      <CosGeneralPanel
        className="flex-1"
        topic={t('home.chart.host.rankingTop10')}
        rightSlot={
          <CosDropdown type="radio" selectedItems={selectedMetricTypes}>
            <CosDropdown.Trigger>
              {selectedMetricTypeDisplay}
            </CosDropdown.Trigger>
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
