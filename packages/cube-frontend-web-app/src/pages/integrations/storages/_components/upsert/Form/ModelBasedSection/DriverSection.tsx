import { produce } from 'immer'
import { ListIntegrationStorageModelsResponseDataInnerMultipathInnerAttributesInner } from '@cube-frontend/api'
import { StorageForm, StorageFormError } from '../../storageFormUtils'
import { StorageFormState } from '../StorageDetailsForm'
import { StorageFormSection } from '../StorageFormSection'
import { StorageInput } from '../StorageInput'

export type DriverSectionProps = {
  storage: StorageForm
  setStorage: React.Dispatch<React.SetStateAction<StorageForm>>
  formState: StorageFormState
  fieldErrors: StorageFormError | undefined
}

export const DriverSection = (props: DriverSectionProps) => {
  const { storage, setStorage, formState, fieldErrors } = props

  const { driverSection } = storage.storage.service
  const driverSectionErrors = fieldErrors?.storage?.service?.driverSection

  const renderField = (
    field: ListIntegrationStorageModelsResponseDataInnerMultipathInnerAttributesInner,
    index: number,
  ) => {
    const { value } = driverSection[index]
    const errorMessage = driverSectionErrors?.[index]?.value?._errors[0]

    const handleChange = (newValue: string) => {
      setStorage((prev) =>
        produce(prev, (draft) => {
          draft.storage.service.driverSection[index].value = newValue
        }),
      )
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
    <StorageFormSection title="Driver Section">
      {driverSection.map(renderField)}
    </StorageFormSection>
  )
}
