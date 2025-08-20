import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useContext } from 'react'
import { MaintenanceUpdateLayout } from '../_components/MaintenanceUpdateLayout'

export const MaintenanceUpdateFixpackPage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  return (
    <MaintenanceUpdateLayout
      currentVersion={dataCenter!.fixpack.version}
      lastUpdated={dataCenter!.fixpack.updatedAt}
    >
      <div className="flex items-start gap-x-4">Fixpack List</div>
    </MaintenanceUpdateLayout>
  )
}
