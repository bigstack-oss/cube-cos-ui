import { MetricsApiGetMetricByTypesRequest } from '@cube-frontend/api'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { GetParamFn } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import dayjs from 'dayjs'
import { useContext, useRef } from 'react'
import { TypeParams } from '../utils'

export const useMetricsParams = () => {
  const dataCenter = useContext(DataCenterContext)

  const currentTime = useRef(dayjs())

  const getTimeRangParams = () => {
    return {
      start: currentTime.current.subtract(10, 'minutes').format(),
      stop: currentTime.current.format(),
    } satisfies Partial<MetricsApiGetMetricByTypesRequest>
  }

  const getMetricsParams = (
    typeParams: TypeParams,
  ): GetParamFn<MetricsApiGetMetricByTypesRequest> => {
    return () => {
      if (!dataCenter.name) return

      return {
        dataCenter: dataCenter.name,
        ...getTimeRangParams(),
        ...typeParams,
      } satisfies MetricsApiGetMetricByTypesRequest
    }
  }

  return getMetricsParams
}
