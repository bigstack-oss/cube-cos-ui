import { useContext, useMemo } from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { noop } from 'lodash'
import { MetricsApiGetMetricsOverviewRequest } from '@cube-frontend/api'
import {
  CosCountSegmentedChart,
  CosDashboardPanel,
  CosPercentagePieChart,
} from '@cube-frontend/ui-library'
import { metricsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useMediaQuery } from '@cube-frontend/web-app/hooks/useMediaQuery'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { shouldDisplayLoading } from '@cube-frontend/web-app/utils/loadingDisplay'
import { useUpdateTime } from '@cube-frontend/web-app/hooks/useUpdateTime'
import { CpuPercentagePieChart } from '@cube-frontend/web-app/components/CpuPercentagePieChart/CpuPercentagePieChart'
import { links } from '../../../links'
import { toMetricsChart } from '../../../utils'
import { HOME_OVERVIEW_PAGE_POLLING_INTERVAL } from '../../homeOverviewPageUtils'
import { defaultMetrics } from './utils'

const ChartPanel = () => {
  const { t } = useTranslation()

  const { dataCenter } = useContext(DataCenterContext)

  const roles = dataCenter!.roles

  const {
    data: metrics = defaultMetrics,
    isLoading,
    hasResponseBeenReceived,
    getResource: getMetricsOverview,
  } = useCosGetRequest(metricsApi.getMetricsOverview, () => {
    return {
      dataCenter: dataCenter!.name,
    } satisfies MetricsApiGetMetricsOverviewRequest
  })

  const { isPolling } = usePolling(
    getMetricsOverview,
    HOME_OVERVIEW_PAGE_POLLING_INTERVAL,
  )

  const showLoading = shouldDisplayLoading({
    isLoading,
    isPolling,
    hasResponseBeenReceived,
  })

  const {
    vmBarChart,
    roleBarChart,
    cpuPieChart,
    memoryPieChart,
    storagePieChart,
  } = useMemo(() => toMetricsChart(metrics, roles, t), [metrics, roles, t])

  const updateTime = useUpdateTime(metrics, showLoading)

  const isSmallScreen = useMediaQuery({ maxWidth: 1300 })

  const vmAllocationPanelItem = (
    <CosDashboardPanel.Item topic={t('home.overview.chart.vmAllocation')}>
      <div className="flex flex-row justify-around gap-x-7">
        <CpuPercentagePieChart isLoading={showLoading} {...cpuPieChart} />
        <CosPercentagePieChart
          title={t('home.overview.chart.memory')}
          overThresholdText={t('home.overview.chart.overLimit')}
          isLoading={showLoading}
          {...memoryPieChart}
        />
        <CosPercentagePieChart
          title={t('home.overview.chart.vmStorage')}
          overThresholdText={t('home.overview.chart.overLimit')}
          isLoading={showLoading}
          {...storagePieChart}
        />
      </div>
    </CosDashboardPanel.Item>
  )

  return (
    <CosDashboardPanel
      title={t('home.tabs.chart')}
      time={updateTime}
      hyperLinkProps={{ onClick: noop }}
      HyperLinkContainer={<Link to={links.chart} />}
      isTimeLoading={showLoading}
    >
      <CosDashboardPanel.Row className="[&>*]:min-w-[500px]">
        <CosDashboardPanel.Col className="flex-1">
          <CosDashboardPanel.Item
            topic={t('home.overview.chart.vmSummary')}
            subtext={`${vmBarChart.count} ${t('home.overview.chart.instance', { count: vmBarChart.count })}`}
            isSubtextLoading={showLoading}
          >
            <CosCountSegmentedChart
              overview={{
                name: t('home.overview.chart.totalVm'),
                count: vmBarChart.count,
              }}
              countInfos={vmBarChart.countInfos}
              isLoading={showLoading}
              skeletonCount={6}
            />
          </CosDashboardPanel.Item>
          <CosDashboardPanel.Item
            topic={t('home.overview.chart.roleSummary')}
            subtext={`${roleBarChart.count} ${t('home.overview.chart.role', { count: roleBarChart.count })}`}
            isSubtextLoading={showLoading}
          >
            <CosCountSegmentedChart
              countInfos={roleBarChart.countInfos}
              isLoading={showLoading}
              skeletonCount={6}
            />
          </CosDashboardPanel.Item>
          {isSmallScreen && vmAllocationPanelItem}
        </CosDashboardPanel.Col>
        {!isSmallScreen && vmAllocationPanelItem}
      </CosDashboardPanel.Row>
    </CosDashboardPanel>
  )
}

export default ChartPanel
