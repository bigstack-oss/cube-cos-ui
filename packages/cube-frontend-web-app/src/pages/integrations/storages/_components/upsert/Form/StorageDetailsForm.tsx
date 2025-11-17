import { GetIntegrationStorageResponseData } from '@cube-frontend/api'
import { CosStroke } from '@cube-frontend/ui-library'
import { StorageForm } from '../storageFormUtils'
import { useVendorModel } from '../../../create/useVendorModel'
import { useStorageForm } from '../useStorageForm'
import { CommonSection } from './CommonSection'
import { Footer } from './Footer'
import { ModelBasedSection } from './ModelBasedSection/ModelBasedSection'

export type StorageDetailsFormProps = {
  isEdit?: boolean
  initialStorage?: GetIntegrationStorageResponseData | undefined
  isInitialStorageLoading?: boolean
  isSaving: boolean
  submitButtonText: string
  onConfirm: (parsedStorage: StorageForm) => void
  onCancel: () => void
}

export type StorageFormState = {
  isEdit: boolean
  isInputDisabled: boolean
  isInputLoading: boolean
  isValidateDisabled: boolean
  isSubmitDisabled: boolean
}

const calculateFormState = (status: {
  isEdit: boolean
  isSaving: boolean
  isVendorsLoading: boolean
  isInitialStorageLoading: boolean | undefined
  allFieldsValid: boolean
}): StorageFormState => {
  const {
    isEdit,
    isVendorsLoading,
    isInitialStorageLoading = false,
    allFieldsValid,
    isSaving,
  } = status

  return {
    isEdit,
    isInputDisabled: isSaving,
    isInputLoading: isInitialStorageLoading || isVendorsLoading,
    isValidateDisabled: !allFieldsValid || isSaving || isVendorsLoading,
    isSubmitDisabled: !allFieldsValid || isVendorsLoading,
  }
}

export const StorageDetailsForm = (props: StorageDetailsFormProps) => {
  const {
    isEdit = false,
    initialStorage,
    isInitialStorageLoading,
    isSaving,
    submitButtonText,
    onConfirm,
    onCancel,
  } = props

  const {
    isLoading: isVendorsLoading,
    selectedModel,
    vendorOptions,
    modelOptions,
    selectedVendor,
    selectedModelName,
    handleSelectedVendorChange,
    handleSelectedModelNameChange,
  } = useVendorModel(initialStorage)

  const { storage, fieldErrors, allFieldsValid, setStorage } = useStorageForm(
    initialStorage,
    selectedModel,
  )

  const formState = calculateFormState({
    isEdit,
    isSaving,
    isVendorsLoading,
    isInitialStorageLoading,
    allFieldsValid,
  })

  const handleConfirm = () => onConfirm(storage)

  return (
    <form className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-8">
        <CommonSection
          storage={storage}
          setStorage={setStorage}
          formState={formState}
          fieldErrors={fieldErrors}
          vendorOptions={vendorOptions}
          modelOptions={modelOptions}
          selectedVendor={selectedVendor}
          selectedModelName={selectedModelName}
          onVendorChange={handleSelectedVendorChange}
          onModelNameChange={handleSelectedModelNameChange}
        />
        {selectedModel && <CosStroke type="dot" />}
        <ModelBasedSection
          selectedModel={selectedModel}
          storage={storage}
          setStorage={setStorage}
          formState={formState}
          fieldErrors={fieldErrors}
        />
      </div>
      <div className="flex flex-col gap-y-3">
        <CosStroke type="dot" />
        <Footer
          isSaving={isSaving}
          submitButtonText={submitButtonText}
          isSubmitDisabled={formState.isSubmitDisabled}
          onConfirm={handleConfirm}
          onCancel={onCancel}
        />
      </div>
    </form>
  )
}
