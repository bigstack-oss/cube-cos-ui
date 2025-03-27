import { TuningsApiUpdateTuningRequest } from '@cube-frontend/api'
import { CosButton, GetCosBasicTable } from '@cube-frontend/ui-library'
import { tuningsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosApiResponse } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { hostToPreviewRow, PreviewRow } from '../createTuningsUtils'
import { CreateTuningsPayload } from '../useCreateTuningsPayload'
import { Board } from './Board'
import { SpecEntry } from './SpecEntry'

type PublishTuningProps = {
  payload: CreateTuningsPayload
}

const PreviewTable = GetCosBasicTable<PreviewRow>()

export const PublishTuning = (props: PublishTuningProps) => {
  const {
    payload: { selectedSpecName, value, selectedHosts },
  } = props

  const navigate = useNavigate()

  const { name: dataCenter } = useContext(DataCenterContext)

  const rows = selectedHosts.map(hostToPreviewRow)

  const {
    isLoading,
    mutateResource: updateTuning,
    errorState,
    clearError,
  } = useCosMutationRequest(
    tuningsApi.updateTuning as (
      params: TuningsApiUpdateTuningRequest,
    ) => Promise<CosApiResponse<undefined>>,
  )

  const onPublishClick = async () => {
    clearError()
    try {
      await updateTuning({
        dataCenter,
        parameterName: selectedSpecName!,
        updateTuningRequest: {
          value: value!,
          hosts: selectedHosts.map((host) => host.name),
        },
      })
      navigate('/events/tunings')
    } catch (error) {
      console.error('Update tuning error: ', error)
    }
  }

  return (
    <Board>
      <SpecEntry specName={selectedSpecName} valueLabel="New Value">
        <p className="primary-body3 py-[9px]">{value!.toString()}</p>
      </SpecEntry>
      <PreviewTable rows={rows}>
        <PreviewTable.Column
          property="host"
          label="Apply to these hosts"
          fitContent={true}
        >
          {(host) => <span className="whitespace-nowrap">{host.name}</span>}
        </PreviewTable.Column>
        <PreviewTable.Column property="host" label="Roles" fitContent={true}>
          {(host) => <span className="whitespace-nowrap">{host.role}</span>}
        </PreviewTable.Column>
        <PreviewTable.Column property="host" label="IP">
          {(host) => host.ip}
        </PreviewTable.Column>
      </PreviewTable>
      {errorState && (
        <div className="primary-body3 text-status-negative">
          {errorState.api?.msg || errorState.native.message}
        </div>
      )}
      <CosButton
        className="self-start"
        usage="text-only"
        loading={isLoading}
        onClick={onPublishClick}
      >
        Publish
      </CosButton>
    </Board>
  )
}
