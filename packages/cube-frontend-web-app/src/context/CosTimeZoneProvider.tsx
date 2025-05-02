import { PropsWithChildren, useContext } from 'react'
import { DataCenterContext } from './DataCenterContext'
import { CosTimeZoneContext } from '@cube-frontend/ui-library'

export const CosTimeZoneProvider = (props: PropsWithChildren) => {
  const { children } = props

  const { dataCenter } = useContext(DataCenterContext)

  if (!dataCenter) return null

  const { utcTimeZone } = dataCenter

  return (
    <CosTimeZoneContext.Provider value={utcTimeZone}>
      {children}
    </CosTimeZoneContext.Provider>
  )
}
