import { TuningsApiUpdateTuningRequest } from '@cube-frontend/api'
import { CosBackButton } from '@cube-frontend/ui-library'
import { tuningsApi } from '@cube-frontend/web-app/api/cosApi'
import { EditTunings } from '@cube-frontend/web-app/components/UpsertTunings/EditTunings'
import { NonNullableUpsertTuningsPayload } from '@cube-frontend/web-app/components/UpsertTunings/upsertTuningsUtils'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosApiResponse } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useEditTuningsStore } from '@cube-frontend/web-app/stores/editTuningsStore'
import { noop } from 'lodash'
import { useContext } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'

export const EditTuningsPage = () => {
  const navigate = useNavigate()

  const defaultData = useEditTuningsStore((store) => store.defaultData)

  const { dataCenter } = useContext(DataCenterContext)

  const {
    mutateResource: updateTuning,
    errorState,
    clearError,
  } = useCosMutationRequest(
    tuningsApi.updateTuning as (
      params: TuningsApiUpdateTuningRequest,
    ) => Promise<CosApiResponse<undefined>>,
  )

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
      navigate('/events/tunings')
    } catch (error) {
      console.error('Update tuning error: ', error)
    }
  }

  if (!defaultData) {
    // This happens when users access the edit tunings page by directly
    // entering the URL in the browser.
    return <Navigate to="/events/tunings" replace={true} />
  }

  const title = defaultData.hosts?.length ? 'Edit Tunings' : 'Create Tunings'

  return (
    <div className="mx-2 my-1">
      <Link className="inline-block" to="/events/tunings">
        <CosBackButton onClick={noop}>{title}</CosBackButton>
      </Link>
      <EditTunings
        defaultData={defaultData}
        errorMessage={errorState?.api?.msg || errorState?.native.message}
        onPublishClick={onPublishClick}
      />
    </div>
  )
}
