import { useTopLicenseNaggingStore } from '@cube-frontend/web-app/stores/topLicenseNaggingStore'
import { useEffect } from 'react'

export const MaintenanceLicensePage = () => {
  const { restoreDefault: restoreTopLicenseNaggingStore } =
    useTopLicenseNaggingStore()

  useEffect(() => {
    return () => {
      restoreTopLicenseNaggingStore()
    }
  }, [restoreTopLicenseNaggingStore])

  return <div>License Page</div>
}
