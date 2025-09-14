import {
  CosButton,
  CosCheckbox,
  CosDropdown,
  CosInput,
  CosPasswordInput,
  CosStatusReaction,
  CosStroke,
  CosTooltip,
} from '@cube-frontend/ui-library'
import InformationCircleFilled from '@cube-frontend/ui-library/icons/monochrome/information_circle_filled.svg?react'
import { CosRequestError } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { FormEvent, useCallback } from 'react'
import { ParsedStorageForm, StorageForm } from '../../storageUtils'
import { useStorageForm } from './useStorageForm'
import { VendorModels } from '../../create/useVendorModel'

export type StorageDetailsFormProps = {
  isEdit?: boolean
  initialStorage?: Partial<StorageForm> | undefined
  isInitialStorageLoading?: boolean
  vendorModels: VendorModels
  isVendorModelsLoading: boolean
  isSaving: boolean
  isValidating: boolean
  isValidated: boolean
  validationErrorState: CosRequestError | undefined
  submitButtonText: string
  clearValidationLog: () => void
  onValidate: (parsedStorage: ParsedStorageForm) => Promise<void>
  onConfirm: (parsedStorage: ParsedStorageForm) => Promise<void>
  onCancel: () => void
}

type StorageFormState = {
  isInputDisabled: boolean
  isInputLoading: boolean
  isValidateDisabled: boolean
  isSubmitDisabled: boolean
}

const calculateFormState = (status: {
  isValidating: boolean
  isSaving: boolean
  isInitialStorageLoading: boolean | undefined
  isVendorsLoading: boolean
  allFieldsValid: boolean
  isValidated: boolean
}): StorageFormState => {
  const {
    isInitialStorageLoading = false,
    isVendorsLoading,
    allFieldsValid,
    isValidating,
    isValidated,
    isSaving,
  } = status

  return {
    isInputDisabled: isValidating || isSaving,
    isInputLoading: isInitialStorageLoading || isVendorsLoading,
    isValidateDisabled: !allFieldsValid || isSaving || isVendorsLoading,
    isSubmitDisabled:
      !isValidated || isValidating || !allFieldsValid || isVendorsLoading,
  }
}

export const StorageDetailsForm = (props: StorageDetailsFormProps) => {
  const {
    isEdit = false,
    initialStorage,
    isInitialStorageLoading,
    isVendorModelsLoading: isVendorsLoading,
    isValidating,
    isValidated,
    isSaving,
    vendorModels,
    validationErrorState,
    submitButtonText,
    clearValidationLog,
    onValidate,
    onConfirm,
    onCancel,
  } = props

  const {
    storage,
    fieldsValidity,
    allFieldsValid,
    updateStorageField,
    getParsedStorage,
  } = useStorageForm(initialStorage)

  const formState = calculateFormState({
    isInitialStorageLoading,
    isVendorsLoading,
    allFieldsValid,
    isValidating,
    isValidated,
    isSaving,
  })

  const handleValidate = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault()
    if (formState.isValidateDisabled) return
    onValidate(getParsedStorage())
  }

  const handleStorageFieldChange = useCallback(
    <Key extends keyof StorageForm>(key: Key, value: StorageForm[Key]) => {
      updateStorageField(key, value)
      if (key !== 'asDefault') {
        clearValidationLog()
      }
    },
    [clearValidationLog, updateStorageField],
  )

  const handleConfirm = async () => onConfirm(getParsedStorage())

  // const renderValidationResult = () => {
  //   if (isValidated) return <CosStatusReaction status="success" />
  //   if (validationErrorState) {
  //     return (
  //       <CosStatusReaction
  //         status="failed"
  //         message={upperFirst(validationErrorState.api?.msg)}
  //       />
  //     )
  //   }
  //   return null
  // }

  const vendorOpts = Object.keys(vendorModels)
  const modelOpts = vendorModels[storage.vendor] || []
  const currentModel = modelOpts.find((m) => m.driver === storage.model)

  // console.log('currentModel', currentModel)

  return (
    <form className="flex flex-col gap-y-3" onSubmit={handleValidate}>
      <div className="flex flex-col gap-y-4 py-4">
        {/* <CosCheckbox
          color="primary"
          label="Set as default"
          checked={storage.asDefault}
          isLoading={formState.isInputLoading}
          disabled={formState.isInputDisabled}
          onChange={(e) =>
            handleStorageFieldChange('asDefault', e.target.checked)
          }
        /> */}
        <CosInput
          label="Storage Name"
          tooltip={
            <CosTooltip
              hoverContent={{
                title: 'Storage name is permanent and used as a unique ID.',
                message:
                  'It cannot be changed after creation and will still be recognized even if the storage is deleted.',
              }}
              placement="top-right"
            >
              <InformationCircleFilled className="icon-md text-functional-border-divider" />
            </CosTooltip>
          }
          placeholder="Storage Name"
          value={storage.name}
          errorMessage={
            !!storage.name && !fieldsValidity.name && 'Invalid name'
          }
          disabled={formState.isInputDisabled || isEdit}
          isLoading={formState.isInputLoading}
          onChange={(e) => handleStorageFieldChange('name', e.target.value)}
        />
        <div className="flex items-center gap-x-4 [&>*]:flex-1">
          <CosDropdown
            size="md"
            type="radio"
            variant="regular"
            selectedItems={storage.vendor ? [storage.vendor] : []}
            isLoading={formState.isInputLoading}
            disabled={formState.isInputDisabled}
            label="Vendor"
          >
            <CosDropdown.Trigger placeholder="Select an Item">
              {storage.vendor || 'Select a vendor'}
            </CosDropdown.Trigger>
            <CosDropdown.Menu>
              {vendorOpts.map((vendor) => (
                <CosDropdown.Item
                  key={vendor}
                  item={vendor}
                  onClick={() => handleStorageFieldChange('vendor', vendor)}
                >
                  {vendor}
                </CosDropdown.Item>
              ))}
            </CosDropdown.Menu>
          </CosDropdown>
          <CosDropdown
            size="md"
            type="radio"
            variant="regular"
            selectedItems={storage.model ? [storage.model] : []}
            isLoading={formState.isInputLoading}
            disabled={formState.isInputDisabled || modelOpts.length === 0}
            label="Name"
          >
            <CosDropdown.Trigger placeholder="Select an Item">
              {storage.model || 'Select a model'}
            </CosDropdown.Trigger>
            <CosDropdown.Menu>
              {(modelOpts ?? []).map((item) => (
                <CosDropdown.Item
                  key={item.driver}
                  item={item.driver}
                  onClick={() => handleStorageFieldChange('model', item.driver)}
                >
                  {item.driver}
                </CosDropdown.Item>
              ))}
            </CosDropdown.Menu>
          </CosDropdown>
        </div>
        <CosStroke type="dot" />
        <h4 className="primary-h4 text-functional-title">Driver Section</h4>
        {currentModel?.storage.service.driverSection.map((field) => {
          return (
            <CosInput
              label={field.key}
              placeholder={field.key}
              value={storage.ip}
              errorMessage={!!storage.ip && !fieldsValidity.ip && 'Invalid IP'}
              disabled={formState.isInputDisabled}
              isLoading={formState.isInputLoading}
              onChange={(e) => handleStorageFieldChange('ip', e.target.value)}
            />
          )
        })}
        {currentModel?.storage.service.extraSettings.map((extraSetting) => {
          return (
            <CosInput
              label={extraSetting.key}
              placeholder={extraSetting.key}
              value={storage.ip}
              errorMessage={!!storage.ip && !fieldsValidity.ip && 'Invalid IP'}
              disabled={formState.isInputDisabled}
              isLoading={formState.isInputLoading}
              onChange={(e) => handleStorageFieldChange('ip', e.target.value)}
            />
          )
        })}
        <CosCheckbox
          color="primary"
          label="useMultipath"
          checked={storage.useMultipath}
          isLoading={formState.isInputLoading}
          disabled={formState.isInputDisabled}
          onChange={(e) =>
            handleStorageFieldChange('useMultipath', e.target.checked)
          }
        />
        <CosCheckbox
          color="primary"
          label="forceMultipath"
          checked={storage.forceMultipath}
          isLoading={formState.isInputLoading}
          disabled={formState.isInputDisabled}
          onChange={(e) =>
            handleStorageFieldChange('forceMultipath', e.target.checked)
          }
        />
        {/* <CosInput
          label="Management IP"
          placeholder="Management IP"
          value={storage.ip}
          errorMessage={!!storage.ip && !fieldsValidity.ip && 'Invalid IP'}
          disabled={formState.isInputDisabled}
          isLoading={formState.isInputLoading}
          onChange={(e) => handleStorageFieldChange('ip', e.target.value)}
        /> */}

        {/* <CosInput
          label="Management IP"
          placeholder="Management IP"
          value={storage.ip}
          errorMessage={!!storage.ip && !fieldsValidity.ip && 'Invalid IP'}
          disabled={formState.isInputDisabled}
          isLoading={formState.isInputLoading}
          onChange={(e) => handleStorageFieldChange('ip', e.target.value)}
        />
        <CosInput
          label="Port"
          placeholder="Port"
          value={storage.port}
          errorMessage={
            !!storage.port && !fieldsValidity.port && 'Invalid port'
          }
          disabled={formState.isInputDisabled}
          isLoading={formState.isInputLoading}
          onChange={(e) => handleStorageFieldChange('port', e.target.value)}
        />
        <CosInput
          label="Username"
          placeholder="Username"
          value={storage.username}
          errorMessage={
            !!storage.username && !fieldsValidity.username && 'Invalid username'
          }
          disabled={formState.isInputDisabled}
          isLoading={formState.isInputLoading}
          onChange={(e) => handleStorageFieldChange('username', e.target.value)}
        />
        <CosPasswordInput
          label="Password"
          placeholder="Password"
          value={storage.password}
          errorMessage={
            !!storage.password && !fieldsValidity.password && 'Invalid password'
          }
          disabled={formState.isInputDisabled}
          isLoading={formState.isInputLoading}
          onChange={(e) => handleStorageFieldChange('password', e.target.value)}
        /> */}
        {/* <div className="flex items-center gap-x-4">
          <CosButton
            type="secondary"
            htmlType="submit"
            className="self-start"
            loading={isValidating}
            disabled={formState.isValidateDisabled}
          >
            Validate
          </CosButton>
          {renderValidationResult()}
        </div> */}
      </div>
      <div className="flex flex-col gap-y-3">
        <CosStroke type="dot" />

        <div className="flex items-center gap-x-4">
          <CosButton
            type="primary"
            htmlType="submit"
            onClick={handleConfirm}
            loading={isSaving}
            disabled={formState.isSubmitDisabled}
          >
            {submitButtonText}
          </CosButton>
          <CosButton type="ghost" onClick={onCancel}>
            Cancel
          </CosButton>
        </div>
      </div>
    </form>
  )
}
