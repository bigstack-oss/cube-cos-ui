import { produce } from 'immer'
import { ListIntegrationStorageModelsResponseDataInnerMultipathInnerAttributesInner } from '@cube-frontend/api'
import { StorageForm, StorageFormError } from '../../storageFormUtils'
import { StorageFormState } from '../StorageDetailsForm'
import { StorageFormSection } from '../StorageFormSection'
import { StorageInput } from '../StorageInput'

export type VolumeSectionProps = {
  storage: StorageForm
  setStorage: React.Dispatch<React.SetStateAction<StorageForm>>
  formState: StorageFormState
  fieldErrors: StorageFormError | undefined
}

export const VolumeTypeSection = (props: VolumeSectionProps) => {
  const { storage, setStorage, formState, fieldErrors } = props

  const { settings: volumeTypeSettings } = storage.storage.volumeType
  const volumeTypeSectionErrors = fieldErrors?.storage?.volumeType?.settings

  const renderField = (
    field: ListIntegrationStorageModelsResponseDataInnerMultipathInnerAttributesInner,
    index: number,
  ) => {
    const value = volumeTypeSettings[index].value
    const errorMessage = volumeTypeSectionErrors?.[index]?.value?._errors[0]

    const handleChange = (newValue: string) => {
      setStorage((prev) => {
        return produce(prev, (draft) => {
          draft.storage.volumeType.settings[index].value = newValue
        })
      })
    }

    return (
      <StorageInput
        key={`${index}-${field.key}`}
        label={field.key}
        value={value}
        errorMessage={errorMessage}
        disabled={formState.isInputDisabled}
        isLoading={formState.isInputLoading}
        onChange={(e) => handleChange(e.target.value)}
      />
    )
  }

  return (
    <StorageFormSection title="Volume Type Settings">
      {volumeTypeSettings.map(renderField)}
    </StorageFormSection>
  )
}
