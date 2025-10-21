import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useParams } from 'react-router'
import { CosBackButton, CosToggle } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import {
  ModuleMetadata,
  useServices,
} from '@cube-frontend/web-app/hooks/useServices/useServices'
import { noop } from 'lodash'
import { moduleNameToLabel } from '../homeHealthPageUtils'
import { HealthDetails } from './HealthDetails'

export const HealthDetailsPage = () => {
  const { module: moduleName } = useParams()

  if (!moduleName) {
    throw new Error('Cannot find module name in the URL')
  }

  const { t } = useTranslation()

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
    return <Navigate to={CosRoutesEnum.HOME_HEALTH_PAGE} replace={true} />
  }

  return (
    <div className="mt-4 flex flex-col gap-y-3">
      <div className="flex items-center justify-between">
        <CosBackButton
          isLoading={!module}
          backButtonContainer={{
            Component: Link,
            props: {
              to: CosRoutesEnum.HOME_HEALTH_PAGE,
            },
          }}
          // Assign noop because `CosBackButton` requires either `href` or `onClick` prop to be presented.
          onClick={noop}
        >
          {`${moduleNameToLabel(moduleName)} ${t('home.health.details')}`}
        </CosBackButton>
        <CosToggle
          label={t('home.health.autoRefresh')}
          isOn={autoRefresh}
          disabled={!module}
          onChange={onAutoRefreshChange}
        />
      </div>
      <HealthDetails module={module} autoRefresh={autoRefresh} />
    </div>
  )
}
