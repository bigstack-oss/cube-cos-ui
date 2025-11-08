import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router'
import { CosBackButton } from '@cube-frontend/ui-library'
import { tuningsApi } from '@cube-frontend/web-app/api/cosApi'
import { CreateTunings } from '@cube-frontend/web-app/components/UpsertTunings/CreateTunings'
import { NonNullableUpsertTuningsPayload } from '@cube-frontend/web-app/components/UpsertTunings/upsertTuningsUtils'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'

export const CreateTuningsPage = () => {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const { dataCenter } = useContext(DataCenterContext)

  const {
    mutateResource: updateTuning,
    errorState,
    clearError,
  } = useCosMutationRequest(tuningsApi.updateTuning)

  const onPublishClick = async (payload: NonNullableUpsertTuningsPayload) => {
    const { selectedSpecName, value, selectedHosts } = payload
    clearError()
    try {
      await updateTuning({
        dataCenter: dataCenter!.name,
        parameterName: selectedSpecName,
        updateTuningRequest: {
          value,
          hosts: selectedHosts.map((host) => host.name),
        },
      })
      navigate(CosRoutesEnum.MAINTENANCE_TUNINGS_PAGE)
    } catch (error) {
      console.error('Create tuning error: ', error)
    }
  }

  return (
    <div className="my-1">
      <CosBackButton
        backButtonContainer={{
          Component: Link,
          props: {
            to: CosRoutesEnum.MAINTENANCE_TUNINGS_PAGE,
          },
        }}
      >
        {t('maintenance.tunings.upsert.create.title')}
      </CosBackButton>
      <CreateTunings
        errorMessage={errorState?.api?.msg || errorState?.native.message}
        onPublishClick={onPublishClick}
      />
    </div>
  )
}
