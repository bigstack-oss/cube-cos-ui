import { useContext, useRef } from 'react'
import dayjs from 'dayjs'
import { MetricsApiGetMetricByTypesRequest } from '@cube-frontend/api'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { GetParamFn } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { TypeParams } from '../utils'

export const useMetricsParams = () => {
  const dataCenter = useContext(DataCenterContext)

  const currentTime = useRef(dayjs())

  const getTimeRangeParams = () => {
    return {
      start: currentTime.current.subtract(1, 'hour').format(),
      stop: currentTime.current.format(),
    } satisfies Partial<MetricsApiGetMetricByTypesRequest>
  }

  const getMetricsParams = (
    typeParams: TypeParams,
  ): GetParamFn<MetricsApiGetMetricByTypesRequest> => {
    return () => {
      return {
        dataCenter: dataCenter.name,
        ...getTimeRangeParams(),
        ...typeParams,
      } satisfies MetricsApiGetMetricByTypesRequest
    }
  }

  return getMetricsParams
}
