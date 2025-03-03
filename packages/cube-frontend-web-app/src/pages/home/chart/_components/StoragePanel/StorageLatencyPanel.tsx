import { useCosStreamRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosStreamRequest'
import {
  getDiskLatencyHistory,
  getDiskLatencyHistoryTypeParams,
} from '../utils'
import { useMetricsParams } from './utils'
import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { StorageChart } from './StorageChart/StorageChart'

export const StorageLatencyPanel = () => {
  const getMetricsParams = useMetricsParams()

  const {
    data: diskLatencyHistory = {
      read: [],
      write: [],
      unit: 'bytes',
    },
    isLoading: diskLatencyHistoryIsLoading,
  } = useCosStreamRequest(
    getDiskLatencyHistory,
    getMetricsParams(getDiskLatencyHistoryTypeParams),
  )
  return (
    <CosGeneralPanel topic="Storage Latency" className="flex-1">
      <StorageChart
        title="Storage Latency"
        unit={diskLatencyHistory.unit}
        read={diskLatencyHistory.read.map((item) => ({
          time: item.time,
          value: item.value,
        }))}
        write={diskLatencyHistory.write.map((item) => ({
          time: item.time,
          value: item.value,
        }))}
        formatter={(value) => {
          return {
            unit: 'ms',
            value,
          }
        }}
      />
    </CosGeneralPanel>
  )
}
