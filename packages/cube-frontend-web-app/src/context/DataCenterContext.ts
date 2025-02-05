import { GetDataCentersResponseDataInner } from '@cube-frontend/api'
import { createContext } from 'react'

export const DataCenterContext = createContext<GetDataCentersResponseDataInner>(
  null as unknown as GetDataCentersResponseDataInner,
)
