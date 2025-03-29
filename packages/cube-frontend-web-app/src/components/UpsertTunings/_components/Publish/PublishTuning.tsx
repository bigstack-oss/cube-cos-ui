import { CosButton, GetCosBasicTable } from '@cube-frontend/ui-library'
import { useMemo, useState } from 'react'
import {
  hostToPreviewRow,
  NonNullableUpsertTuningsPayload,
  PreviewRow,
  UpsertTuningsPayload,
} from '../../upsertTuningsUtils'
import { Board } from '../Board'
import { SpecEntry } from '../SpecEntry'

type PublishTuningProps = {
  payload: UpsertTuningsPayload
  errorMessage?: string | undefined
  onPublishClick: (payload: NonNullableUpsertTuningsPayload) => Promise<void>
}

const PreviewTable = GetCosBasicTable<PreviewRow>()

export const PublishTuning = (props: PublishTuningProps) => {
  const { payload, errorMessage, onPublishClick: onPublishClickProp } = props

  const { selectedSpecName, value, selectedHosts } = payload

  const [isLoading, setIsLoading] = useState(false)

  const rows = useMemo<PreviewRow[]>(
    () => selectedHosts.map(hostToPreviewRow),
    [selectedHosts],
  )

  const onPublishClick = async () => {
    setIsLoading(true)
    try {
      await onPublishClickProp(payload as NonNullableUpsertTuningsPayload)
    } finally {
      setIsLoading(false)
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
      {errorMessage && (
        <div className="primary-body3 text-status-negative">{errorMessage}</div>
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
