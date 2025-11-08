import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ListTuningSpecResponseDataInner } from '@cube-frontend/api'
import { CosButton, GetCosBasicTable } from '@cube-frontend/ui-library'
import {
  hostToPreviewRow,
  NonNullableUpsertTuningsPayload,
  payloadValueToLimitationValue,
  PreviewRow,
  UpsertTuningsPayload,
} from '../../upsertTuningsUtils'
import { SpecEntry } from '../SpecEntry'
import { TuningsPreviousButton } from '../TuningsPreviousButton'
import { Board } from '../Board'

type PublishTuningProps = {
  payload: UpsertTuningsPayload
  selectedSpec: ListTuningSpecResponseDataInner
  errorMessage?: string | undefined
  onPublishClick: (payload: NonNullableUpsertTuningsPayload) => Promise<void>
}

const PreviewTable = GetCosBasicTable<PreviewRow>()

export const PublishTuning = (props: PublishTuningProps) => {
  const {
    payload,
    selectedSpec,
    errorMessage,
    onPublishClick: onPublishClickProp,
  } = props

  const { selectedSpecName, value, selectedHosts } = payload

  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)

  const rows = useMemo<PreviewRow[]>(
    () => selectedHosts.map(hostToPreviewRow),
    [selectedHosts],
  )

  const onPublishClick = async () => {
    setIsLoading(true)
    try {
      const transformedPayload = {
        ...payload,
        value: payloadValueToLimitationValue(
          selectedSpec.limitation.type,
          payload.value!,
        ),
      } as NonNullableUpsertTuningsPayload

      await onPublishClickProp(transformedPayload)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Board>
      <SpecEntry
        specName={selectedSpecName}
        valueLabel={t('maintenance.tunings.upsert.newValue')}
      >
        <p className="primary-body3 py-[9px]">{value!.toString()}</p>
      </SpecEntry>
      <PreviewTable rows={rows}>
        <PreviewTable.Column
          property="host"
          label={t('maintenance.tunings.upsert.applyToTheseHosts')}
          fitContent={true}
        >
          {(host) => <span className="whitespace-nowrap">{host.name}</span>}
        </PreviewTable.Column>
        <PreviewTable.Column
          property="host"
          label={t('maintenance.tunings.upsert.roles')}
          fitContent={true}
        >
          {(host) => <span className="whitespace-nowrap">{host.role}</span>}
        </PreviewTable.Column>
        <PreviewTable.Column
          property="host"
          label={t('maintenance.tunings.upsert.ip')}
        >
          {(host) => host.ip}
        </PreviewTable.Column>
      </PreviewTable>
      {errorMessage && (
        <div className="primary-body3 text-status-negative">{errorMessage}</div>
      )}
      <div className="flex items-center gap-x-4">
        <TuningsPreviousButton />
        <CosButton
          usage="text-only"
          loading={isLoading}
          onClick={onPublishClick}
        >
          {t('maintenance.tunings.upsert.publish')}
        </CosButton>
      </div>
    </Board>
  )
}
