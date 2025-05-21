import { ListTuningSpecResponseDataInner } from '@cube-frontend/api'
import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { ChangeEvent, useMemo } from 'react'
import { UpsertTuningsPayloadValue } from '../../upsertTuningsUtils'
import { Board } from '../Board'
import { SpecEntry } from '../SpecEntry'
import { TuningSpecTableSection } from './TuningSpecTableSection'
import { TuningValueControl } from './TuningValueControl'
import { validateTuningValue } from './validateTuningValue'

type SelectKeyValueProps = {
  isLoading: boolean
  specs: ListTuningSpecResponseDataInner[] | undefined
  selectedSpec: ListTuningSpecResponseDataInner | undefined
  value: UpsertTuningsPayloadValue
  onSpecSelect: (spec: ListTuningSpecResponseDataInner) => void
  onValueChange: (e: ChangeEvent<HTMLInputElement> | boolean) => void
  onNextClick: () => void
}

export const SelectKeyValue = (props: SelectKeyValueProps) => {
  const {
    isLoading,
    specs,
    selectedSpec,
    value,
    onSpecSelect,
    onValueChange,
    onNextClick,
  } = props

  const isValueValid = useMemo<boolean>(
    () => validateTuningValue(selectedSpec?.limitation, value),
    [selectedSpec?.limitation, value],
  )

  return (
    <Board>
      <p className="primary-body3 text-functional-text">
        Please select a pair of Key-Value and enter a new Value.
      </p>
      <TuningSpecTableSection
        isLoading={isLoading}
        specs={specs}
        selectedSpec={selectedSpec}
        onSpecSelect={onSpecSelect}
      />
      <CosStroke type="regular" />
      {!!selectedSpec && (
        <SpecEntry specName={selectedSpec.name} valueLabel="Enter Value">
          <TuningValueControl
            limitation={selectedSpec.limitation}
            value={value}
            isValueValid={isValueValid}
            onChange={onValueChange}
          />
        </SpecEntry>
      )}
      <CosStroke type="dot" />
      <CosButton
        className="self-start"
        usage="icon-right"
        Icon={ChevronRight}
        disabled={!isValueValid}
        onClick={onNextClick}
      >
        Next
      </CosButton>
    </Board>
  )
}
