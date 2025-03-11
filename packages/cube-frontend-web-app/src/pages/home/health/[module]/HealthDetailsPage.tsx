import { CosBackButton, CosToggle } from '@cube-frontend/ui-library'
import {
  ModuleMetadata,
  useServices,
} from '@cube-frontend/web-app/hooks/useServices/useServices'
import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { HealthDetails } from './HealthDetails'

export const HealthDetailsPage = () => {
  const { module: moduleName } = useParams()

  if (!moduleName) {
    throw new Error('Cannot find module name in the URL')
  }

  const { isLoadingServices, findModule } = useServices()

  const [autoRefresh, setAutoRefresh] = useState(true)

  const onAutoRefreshChange = (value: boolean) => {
    setAutoRefresh(value)
  }

  const module = useMemo<ModuleMetadata | undefined>(
    () => findModule(moduleName),
    [findModule, moduleName],
  )

  if (!module && !isLoadingServices) {
    return <Navigate to="/home/health" replace={true} />
  }

  return (
    <div className="mt-4 flex flex-col gap-y-3">
      <div className="flex items-center justify-between">
        <Link to="/home/health">
          <CosBackButton details={`${moduleName} Details`} loading={!module}>
            {module?.service ?? ''}
          </CosBackButton>
        </Link>
        <CosToggle
          label="Auto-Refresh"
          isOn={autoRefresh}
          disabled={!module}
          onChange={onAutoRefreshChange}
        />
      </div>
      <HealthDetails module={module} autoRefresh={autoRefresh} />
    </div>
  )
}
