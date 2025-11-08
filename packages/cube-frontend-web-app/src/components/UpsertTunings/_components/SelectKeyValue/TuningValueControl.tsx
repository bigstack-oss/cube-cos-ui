import { ChangeEvent, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ListTuningResponseDataTuningsInnerLimitationDefault,
  ListTuningSpecResponseDataInnerLimitation,
  TuningLimitationType,
} from '@cube-frontend/api'
import { CosRadioButton, CosTableInput } from '@cube-frontend/ui-library'

type TuningValueControlProps = {
  limitation: ListTuningSpecResponseDataInnerLimitation
  value: ListTuningResponseDataTuningsInnerLimitationDefault | undefined
  isValueValid: boolean
  onChange: (e: ChangeEvent<HTMLInputElement> | boolean) => void
}

export const TuningValueControl = (props: TuningValueControlProps) => {
  const { limitation, value, isValueValid, onChange } = props

  const { t } = useTranslation()

  const renderInput = () => {
    return (
      <CosTableInput
        className="w-[280px]"
        placeholder={t('maintenance.tunings.upsert.value')}
        value={value?.toString() ?? ''}
        errorMessage={
          !isValueValid && t('maintenance.tunings.upsert.invalidValue')
        }
        onChange={onChange}
      />
    )
  }

  const renderBoolControl = () => {
    return (
      <div className="mt-2 flex items-center gap-x-2">
        <CosRadioButton
          label="True"
          checked={value === true}
          onChange={() => onChange(true)}
        />
        <CosRadioButton
          label="False"
          checked={value === false}
          onChange={() => onChange(false)}
        />
      </div>
    )
  }

  const renderFnMap: Record<TuningLimitationType, () => ReactNode> = {
    str: renderInput,
    int: renderInput,
    uint: renderInput,
    bool: renderBoolControl,
  }

  return renderFnMap[limitation.type]()
}
