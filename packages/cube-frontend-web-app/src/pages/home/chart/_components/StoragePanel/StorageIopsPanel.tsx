import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { StorageChart } from './StorageChart/StorageChart'
import { useCosStreamRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosStreamRequest'
import { getDiskIopsHistory, getDiskIopsHistoryTypeParams } from '../utils'
import { useMetricsParams } from './utils'
import { toAbbreviation } from '@cube-frontend/web-app/utils/number'

export const StorageIopsPanel = () => {
  const getMetricsParams = useMetricsParams()
  const {
    data: diskIopsHistory = {
      read: [],
      write: [],
      unit: 'bytes',
    },
    isLoading: diskIopsHistoryIsLoading,
  } = useCosStreamRequest(
    getDiskIopsHistory,
    getMetricsParams(getDiskIopsHistoryTypeParams),
  )

  return (
    <CosGeneralPanel topic="Storage IOPs" className="flex-1">
      <StorageChart
        unit={diskIopsHistory.unit}
        unitSuffix="/s"
        read={diskIopsHistory.read.map((item) => ({
          time: item.time,
          value: item.value,
        }))}
        write={diskIopsHistory.write.map((item) => ({
          time: item.time,
          value: item.value,
        }))}
        formatter={(value) => {
          return {
            unit: diskIopsHistory.unit,
            value: toAbbreviation(value),
          }
        }}
      />
    </CosGeneralPanel>
  )
}
