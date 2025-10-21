import {
  GetCpuUsageRankOfHostsResponse,
  GetCpuUsageRankOfVmsResponse,
  GetDiskBandwidthHistoryOfHostsResponse,
  GetDiskIopsHistoryOfHostsResponse,
  GetDiskReadIopsRankOfVmsResponse,
  GetDiskUsageRankOfHostsResponse,
  GetDiskWriteIopsRankOfVmsResponse,
  GetGrafanaDashboardLinkResponseData,
  GetMemoryUsageRankOfHostsResponse,
  GetMemoryUsageRankOfVmsResponse,
  GetMetricByTypes200Response,
  GetNetworkTrafficInRankOfHostsResponse,
  GetNetworkTrafficInRankOfVmsResponse,
  GetNetworkTrafficOutRankOfHostsResponse,
  GetNetworkTrafficOutRankOfVmsResponse,
  MetricsApiGetMetricByTypesRequest,
} from '@cube-frontend/api'
import { CosGeneralPanelTitleBarProps } from '@cube-frontend/ui-library'
import { metricsApi } from '@cube-frontend/web-app/api/cosApi'
import { CosGetApiResponse } from '@cube-frontend/web-app/hooks/useCosRequest/cosGetRequestUtils'
import { AxiosRequestConfig } from 'axios'
import { TFunction } from 'i18next'
import { noop } from 'lodash'

const getMetricsByTypes = async <T extends GetMetricByTypes200Response>(
  req: MetricsApiGetMetricByTypesRequest,
  options?: AxiosRequestConfig,
): Promise<CosGetApiResponse<T['data']>> => {
  const metrics = await metricsApi.getMetricByTypes(req, options)
  return metrics as unknown as CosGetApiResponse<T['data']>
}

export type TypeParams = Pick<
  MetricsApiGetMetricByTypesRequest,
  'entityType' | 'metricType' | 'viewType'
>

export const getDiskBandwidthHistory =
  getMetricsByTypes<GetDiskBandwidthHistoryOfHostsResponse>
export const getDiskBandwidthHistoryTypeParams = {
  entityType: 'hosts',
  metricType: 'diskBandwidth',
  viewType: 'history',
} satisfies TypeParams

export const getDiskIopsHistory =
  getMetricsByTypes<GetDiskIopsHistoryOfHostsResponse>
export const getDiskIopsHistoryTypeParams = {
  entityType: 'hosts',
  metricType: 'diskIops',
  viewType: 'history',
} satisfies TypeParams

export const getDiskLatencyHistory =
  getMetricsByTypes<GetDiskIopsHistoryOfHostsResponse>
export const getDiskLatencyHistoryTypeParams = {
  entityType: 'hosts',
  metricType: 'diskLatency',
  viewType: 'history',
} satisfies TypeParams

export const getRanking = getMetricsByTypes<
  | GetCpuUsageRankOfHostsResponse
  | GetCpuUsageRankOfVmsResponse
  | GetMemoryUsageRankOfHostsResponse
  | GetMemoryUsageRankOfVmsResponse
  | GetDiskUsageRankOfHostsResponse
  | GetDiskReadIopsRankOfVmsResponse
  | GetDiskWriteIopsRankOfVmsResponse
  | GetNetworkTrafficInRankOfHostsResponse
  | GetNetworkTrafficInRankOfVmsResponse
  | GetNetworkTrafficOutRankOfHostsResponse
  | GetNetworkTrafficOutRankOfVmsResponse
>

export const CHART_PAGE_POLLING_INTERVAL = 30 * 1000

export const computeTitleBarHyperlinkProps = (
  response: GetGrafanaDashboardLinkResponseData | undefined,
  t: TFunction<'translation', undefined>,
): CosGeneralPanelTitleBarProps['hyperLinkProps'] => {
  if (!response) {
    // Grafana link is still loading.
    return {
      children: t('home.chart.monitor'),
      onClick: noop,
      disabled: true,
    }
  }

  if (!response.enabled) {
    // The related feature is disabled in Grafana.
    // Hide the hyperlink.
    return undefined
  }

  return {
    children: t('home.chart.monitor'),
    href: response.link,
    target: '_blank',
  }
}
