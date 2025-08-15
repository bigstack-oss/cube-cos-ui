import { MetricsApiGetMetricsOverviewRequest } from '@cube-frontend/api'
import {
  CosCountSegmentedChart,
  CosDashboardPanel,
  CosPercentagePieChart,
} from '@cube-frontend/ui-library'

import { toPluralizeDisplay } from '@cube-frontend/utils'
import { metricsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useMediaQuery } from '@cube-frontend/web-app/hooks/useMediaQuery'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { shouldDisplayLoading } from '@cube-frontend/web-app/utils/loadingDisplay'
import { useUpdateTime } from '@cube-frontend/web-app/hooks/useUpdateTime'
import { CpuPercentagePieChart } from '@cube-frontend/web-app/components/CpuPercentagePieChart/CpuPercentagePieChart'
import { noop } from 'lodash'
import { useContext, useMemo } from 'react'
import { Link } from 'react-router'
import { links } from '../../../links'
import { toMetricsChart } from '../../../utils'
import { HOME_OVERVIEW_PAGE_POLLING_INTERVAL } from '../../homeOverviewPageUtils'
import { defaultMetrics } from './utils'

const ChartPanel = () => {
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
  } = useMemo(() => toMetricsChart(metrics, roles), [metrics, roles])

  const updateTime = useUpdateTime(metrics, showLoading)

  const isSmallScreen = useMediaQuery({ maxWidth: 1300 })

  const vmAllocationPanelItem = (
    <CosDashboardPanel.Item topic="VM allocation">
      <div className="flex flex-row justify-around gap-x-7">
        <CpuPercentagePieChart isLoading={showLoading} {...cpuPieChart} />
        <CosPercentagePieChart
          title="Memory"
          overThresholdText="Over Limit"
          isLoading={showLoading}
          {...memoryPieChart}
        />
        <CosPercentagePieChart
          title="Storage"
          overThresholdText="Over Limit"
          isLoading={showLoading}
          {...storagePieChart}
        />
      </div>
    </CosDashboardPanel.Item>
  )

  return (
    <CosDashboardPanel
      title="Chart"
      time={updateTime}
      hyperLinkProps={{ onClick: noop }}
      HyperLinkContainer={<Link to={links.chart} />}
      isTimeLoading={showLoading}
    >
      <CosDashboardPanel.Row className="[&>*]:min-w-[500px]">
        <CosDashboardPanel.Col className="flex-1">
          <CosDashboardPanel.Item
            topic="VM Summary"
            subtext={toPluralizeDisplay(vmBarChart.count, 'Instance')}
            isSubtextLoading={showLoading}
          >
            <CosCountSegmentedChart
              overview={{ name: 'Total VM', count: vmBarChart.count }}
              countInfos={vmBarChart.countInfos}
              isLoading={showLoading}
              skeletonCount={6}
            />
          </CosDashboardPanel.Item>
          <CosDashboardPanel.Item
            topic="Role Summary"
            subtext={toPluralizeDisplay(roleBarChart.count, 'Role')}
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
