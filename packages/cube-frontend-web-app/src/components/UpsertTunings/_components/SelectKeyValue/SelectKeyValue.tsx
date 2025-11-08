import { ChangeEvent, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ListTuningSpecResponseDataInner } from '@cube-frontend/api'
import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { UpsertTuningsPayloadValue } from '../../upsertTuningsUtils'
import { SpecEntry } from '../SpecEntry'
import { TuningSpecTableSection } from './TuningSpecTableSection'
import { TuningValueControl } from './TuningValueControl'
import { UseSpecFilter } from './useSpecFilter'
import { validateTuningValue } from './validateTuningValue'
import { Board } from '../Board'

type SelectKeyValueProps = {
  isLoading: boolean
  specs: ListTuningSpecResponseDataInner[] | undefined
  selectedSpec: ListTuningSpecResponseDataInner | undefined
  specFilter: UseSpecFilter
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
    specFilter,
    value,
    onSpecSelect,
    onValueChange,
    onNextClick,
  } = props

  const { t } = useTranslation()

  const isValueValid = useMemo<boolean>(
    () => validateTuningValue(selectedSpec?.limitation, value),
    [selectedSpec?.limitation, value],
  )

  return (
    <Board>
      <p className="primary-body3 text-functional-text">
        {t('maintenance.tunings.upsert.keyValueStepCreateMessage')}
      </p>
      <TuningSpecTableSection
        isLoading={isLoading}
        specs={specs}
        selectedSpec={selectedSpec}
        specFilter={specFilter}
        onSpecSelect={onSpecSelect}
      />
      {!!selectedSpec && (
        <>
          <CosStroke type="regular" />
          <SpecEntry
            specName={selectedSpec.name}
            valueLabel={t('maintenance.tunings.upsert.enterValue')}
          >
            <TuningValueControl
              limitation={selectedSpec.limitation}
              value={value}
              isValueValid={isValueValid}
              onChange={onValueChange}
            />
          </SpecEntry>
        </>
      )}
      <CosStroke type="dot" />
      <CosButton
        className="self-start"
        usage="icon-right"
        Icon={ChevronRight}
        disabled={!isValueValid}
        onClick={onNextClick}
      >
        {t('maintenance.tunings.upsert.next')}
      </CosButton>
    </Board>
  )
}
