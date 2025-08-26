import { ListTuningSpecResponseDataInner } from '@cube-frontend/api'
import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { ChangeEvent, useMemo } from 'react'
import { UpsertTuningsPayload } from '../../upsertTuningsUtils'
import { TuningValueControl } from '../SelectKeyValue/TuningValueControl'
import { validateTuningValue } from '../SelectKeyValue/validateTuningValue'
import { SpecEntry } from '../SpecEntry'
import { Board } from '../Board'

type EditValueProps = {
  isLoading: boolean
  payload: UpsertTuningsPayload | undefined
  selectedSpec: ListTuningSpecResponseDataInner | undefined
  onValueChange: (e: ChangeEvent<HTMLInputElement> | boolean) => void
  onNextClick: () => void
}

export const EditValue = (props: EditValueProps) => {
  const { isLoading, payload, selectedSpec, onValueChange, onNextClick } = props

  const isValueValid = useMemo<boolean>(
    () => validateTuningValue(selectedSpec?.limitation, payload?.value),
    [selectedSpec?.limitation, payload?.value],
  )

  if (!isLoading && !selectedSpec) {
    return (
      <Board>
        <p className="primary-body3 text-functional-disable-text">
          {`Cannot find tuning with key ${payload?.selectedSpecName}`}
        </p>
      </Board>
    )
  }

  return (
    <Board>
      <p className="primary-body3 text-functional-text">
        Please enter a new Value.
      </p>
      <CosStroke type="regular" />
      <SpecEntry
        isLoading={isLoading}
        specName={selectedSpec?.name}
        limitation={selectedSpec?.limitation}
        valueLabel="Enter Value"
      >
        {selectedSpec && (
          <TuningValueControl
            limitation={selectedSpec.limitation}
            value={payload!.value}
            isValueValid={isValueValid}
            onChange={onValueChange}
          />
        )}
      </SpecEntry>
      <CosStroke type="dot" />
      <CosButton
        className="self-start"
        usage="icon-right"
        Icon={ChevronRight}
        disabled={isLoading || !isValueValid}
        onClick={onNextClick}
      >
        Next
      </CosButton>
    </Board>
  )
}
