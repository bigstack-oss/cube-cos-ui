import { useContext, useMemo } from 'react'
import { MetricsApiGetMetricsOverviewRequest } from '@cube-frontend/api'
import {
  CosCountSegmentedChart,
  CosDashboardPanel,
  CosPercentagePieChart,
} from '@cube-frontend/ui-library'
import { toPluralizeDisplay } from '@cube-frontend/utils'
import { metricsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useUpdateTime } from '@cube-frontend/web-app/hooks/useUpdateTime'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { links } from '../../../links'
import { toMetricsChart } from '../../../utils'
import { defaultMetrics } from './utils'
import { useSequentialInterval } from '@cube-frontend/web-app/hooks/useSequentialInterval/useSequentialInterval'
import { HOME_OVERVIEW_PAGE_POLLING_INTERVAL } from '../../homeOverviewPageUtils'
import { noop } from 'lodash'
import { Link } from 'react-router'

const ChartPanel = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const {
    data: metrics = defaultMetrics,
    hasResponseBeenReceived,
    getResource: getMetricsOverview,
  } = useCosGetRequest(metricsApi.getMetricsOverview, () => {
    return {
      dataCenter: dataCenter!.name,
    } satisfies MetricsApiGetMetricsOverviewRequest
  })

  const isLoading = !hasResponseBeenReceived

  useSequentialInterval(
    getMetricsOverview,
    HOME_OVERVIEW_PAGE_POLLING_INTERVAL,
    {
      immediate: false,
    },
  )

  const {
    vmBarChart,
    roleBarChart,
    cpuPieChart,
    memoryPieChart,
    storagePieChart,
  } = useMemo(() => toMetricsChart(metrics), [metrics])

  const updateTime = useUpdateTime(metrics, isLoading)

  return (
    <CosDashboardPanel
      title="Chart"
      time={updateTime}
      hyperLinkProps={{ onClick: noop }}
      HyperLinkContainer={<Link to={links.chart} />}
      isTimeLoading={isLoading}
    >
      <CosDashboardPanel.Row>
        <CosDashboardPanel.Col className="flex-1">
          <CosDashboardPanel.Item
            topic="VM Summary"
            subtext={toPluralizeDisplay(vmBarChart.count, 'Instance')}
            isSubtextLoading={isLoading}
          >
            <CosCountSegmentedChart
              overview={{ name: 'Total VM', count: vmBarChart.count }}
              countInfos={vmBarChart.countInfos}
              isLoading={isLoading}
              skeletonCount={6}
            />
          </CosDashboardPanel.Item>
          <CosDashboardPanel.Item
            topic="Role Summary"
            subtext={toPluralizeDisplay(roleBarChart.count, 'Role')}
            isSubtextLoading={isLoading}
          >
            <CosCountSegmentedChart
              countInfos={roleBarChart.countInfos}
              isLoading={isLoading}
              skeletonCount={6}
            />
          </CosDashboardPanel.Item>
        </CosDashboardPanel.Col>
        <CosDashboardPanel.Item topic="VM allocation">
          <div className="flex flex-row justify-between gap-x-7">
            <CosPercentagePieChart
              title="vCPU"
              isLoading={isLoading}
              {...cpuPieChart}
            />
            <CosPercentagePieChart
              title="Memory"
              isLoading={isLoading}
              {...memoryPieChart}
            />
            <CosPercentagePieChart
              title="Storage"
              isLoading={isLoading}
              {...storagePieChart}
            />
          </div>
        </CosDashboardPanel.Item>
      </CosDashboardPanel.Row>
    </CosDashboardPanel>
  )
}

export default ChartPanel
