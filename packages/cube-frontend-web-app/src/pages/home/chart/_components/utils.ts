import { AxiosRequestConfig } from 'axios'
import {
  GetMetricByTypes200Response,
  MetricsApiGetMetricByTypesRequest,
  GetDiskBandwidthHistoryOfHostsResponse,
  GetDiskIopsHistoryOfHostsResponse,
  GetNetworkTrafficInRankOfHostsResponse,
  GetCpuUsageRankOfHostsResponse,
  GetDiskUsageRankOfHostsResponse,
  GetMemoryUsageRankOfHostsResponse,
  GetNetworkTrafficOutRankOfHostsResponse,
  GetNetworkTrafficInRankOfVmsResponse,
  GetNetworkTrafficOutRankOfVmsResponse,
  GetCpuUsageRankOfVmsResponse,
  GetMemoryUsageRankOfVmsResponse,
  GetDiskReadIopsRankOfVmsResponse,
  GetDiskWriteIopsRankOfVmsResponse,
} from '@cube-frontend/api'
import { metricsApi } from '@cube-frontend/web-app/api/cosApi'
import { CosApiResponse } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'

const getMetricsByTypes = async <T extends GetMetricByTypes200Response>(
  req: MetricsApiGetMetricByTypesRequest,
  options?: AxiosRequestConfig,
): Promise<CosApiResponse<T['data']>> => {
  const metrics = await metricsApi.getMetricByTypes(req, options)
  return metrics as unknown as CosApiResponse<T['data']>
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
