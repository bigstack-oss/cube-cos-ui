import { createContext } from 'react'
import { DataCenter } from '@cube-frontend/api'

type DataCenterContextValue = {
  dataCenter: DataCenter | undefined
  fetchDataCenters: (() => Promise<DataCenter[]>) | undefined
  isLoading: boolean
}

export const DataCenterContext = createContext<DataCenterContextValue>({
  dataCenter: undefined,
  fetchDataCenters: undefined,
  isLoading: false,
})
