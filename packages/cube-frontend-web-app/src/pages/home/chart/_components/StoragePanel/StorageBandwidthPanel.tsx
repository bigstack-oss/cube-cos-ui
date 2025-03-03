import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { StorageChart } from './StorageChart/StorageChart'
import { useCosStreamRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosStreamRequest'
import {
  getDiskBandwidthHistory,
  getDiskBandwidthHistoryTypeParams,
} from '../utils'
import { useMetricsParams } from './utils'
import {
  convertSize,
  getReadableSizeUnit,
  SizeUnit,
} from '@cube-frontend/web-app/utils/byte'

export const StorageBandwidthPanel = () => {
  const getMetricsParams = useMetricsParams()
  const {
    data: diskBandWidthHistory = {
      read: [],
      write: [],
      unit: 'bytes',
    },
    isLoading: diskBandWidthIsLoading,
  } = useCosStreamRequest(
    getDiskBandwidthHistory,
    getMetricsParams(getDiskBandwidthHistoryTypeParams),
  )

  return (
    <CosGeneralPanel topic="Storage Bandwidth" className="flex-1">
      <StorageChart
        unit={diskBandWidthHistory.unit}
        unitSuffix="/s"
        read={diskBandWidthHistory.read.map((item) => ({
          time: item.time,
          value: item.value,
        }))}
        write={diskBandWidthHistory.write.map((item) => ({
          time: item.time,
          value: item.value,
        }))}
        formatter={(value) => {
          const readableUnit = getReadableSizeUnit(
            value,
            diskBandWidthHistory.unit as SizeUnit,
          )
          const readableValue = convertSize(value, {
            fromUnit: diskBandWidthHistory.unit as SizeUnit,
            toUnit: readableUnit,
          })

          return {
            unit: readableUnit,
            value: readableValue,
          }
        }}
      />
    </CosGeneralPanel>
  )
}
