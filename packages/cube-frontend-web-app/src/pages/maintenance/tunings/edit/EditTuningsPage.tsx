import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useNavigate } from 'react-router'
import { CosBackButton } from '@cube-frontend/ui-library'
import { tuningsApi } from '@cube-frontend/web-app/api/cosApi'
import { EditTunings } from '@cube-frontend/web-app/components/UpsertTunings/EditTunings'
import { NonNullableUpsertTuningsPayload } from '@cube-frontend/web-app/components/UpsertTunings/upsertTuningsUtils'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useEditTuningsStore } from '@cube-frontend/web-app/stores/editTuningsStore'

export const EditTuningsPage = () => {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const initialData = useEditTuningsStore((store) => store.initialData)

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
      console.error('Update tuning error: ', error)
    }
  }

  if (!initialData) {
    // This happens when users access the edit tunings page by directly
    // entering the URL in the browser.
    return (
      <Navigate to={CosRoutesEnum.MAINTENANCE_TUNINGS_PAGE} replace={true} />
    )
  }

  const title = initialData.hosts?.length
    ? t('maintenance.tunings.upsert.edit.title')
    : t('maintenance.tunings.upsert.create.title')

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
        {title}
      </CosBackButton>
      <EditTunings
        initialData={initialData}
        errorMessage={errorState?.api?.msg || errorState?.native.message}
        onPublishClick={onPublishClick}
      />
    </div>
  )
}
