import { PropsWithChildren, useContext } from 'react'
import { DataCenterContext } from './DataCenterContext'
import { CosTimeZoneContext } from '@cube-frontend/ui-library'

export const CosTimeZoneProvider = (props: PropsWithChildren) => {
  const { children } = props

  const { dataCenter, isLoading: isDataCenterLoading } =
    useContext(DataCenterContext)

  if (!dataCenter || isDataCenterLoading) return null

  const { utcTimeZone } = dataCenter

  if (!utcTimeZone) return null

  return (
    <CosTimeZoneContext.Provider value={utcTimeZone}>
      {children}
    </CosTimeZoneContext.Provider>
  )
}
