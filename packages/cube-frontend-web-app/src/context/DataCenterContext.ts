import { createContext } from 'react'
import { GetDataCentersResponseDataInner } from '@cube-frontend/api'

type DataCenterContextValue = {
  dataCenter: GetDataCentersResponseDataInner | undefined
  fetchDataCenters:
    | (() => Promise<GetDataCentersResponseDataInner[]>)
    | undefined
  isLoading: boolean
}

export const DataCenterContext = createContext<DataCenterContextValue>({
  dataCenter: undefined,
  fetchDataCenters: undefined,
  isLoading: false,
})
