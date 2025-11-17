import { useCallback } from 'react'
import { produce } from 'immer'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import {
  CosDropdown,
  CosHyperlink,
  CosInput,
  CosTooltip,
} from '@cube-frontend/ui-library'
import InformationCircleFilled from '@cube-frontend/ui-library/icons/monochrome/information_circle_filled.svg?react'
import { UseVendorModel } from '../../../create/useVendorModel'
import { StorageForm, StorageFormError } from '../storageFormUtils'
import { StorageFormState } from './StorageDetailsForm'
import { StorageFormSection } from './StorageFormSection'

export type CommonSectionProps = {
  storage: StorageForm
  setStorage: React.Dispatch<React.SetStateAction<StorageForm>>
  formState: StorageFormState
  fieldErrors: StorageFormError | undefined
  onVendorChange: UseVendorModel['handleSelectedVendorChange']
  onModelNameChange: UseVendorModel['handleSelectedModelNameChange']
} & Pick<
  UseVendorModel,
  'vendorOptions' | 'modelOptions' | 'selectedVendor' | 'selectedModelName'
>

export const CommonSection = (props: CommonSectionProps) => {
  const {
    vendorOptions,
    modelOptions,
    selectedVendor,
    onVendorChange,
    selectedModelName,
    onModelNameChange,
    storage,
    setStorage,
    formState,
    fieldErrors,
  } = props

  const updateStorageCommonField = useCallback(
    <Key extends keyof StorageForm>(key: Key, value: StorageForm[Key]) => {
      setStorage((prev) =>
        produce(prev, (draft) => {
          draft[key] = value
        }),
      )
    },
    [setStorage],
  )

  return (
    <StorageFormSection>
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
        errorMessage={fieldErrors?.name?._errors[0]}
        disabled={formState.isInputDisabled || formState.isEdit}
        isLoading={formState.isInputLoading}
        onChange={(e) => updateStorageCommonField('name', e.target.value)}
      />
      <div className="flex items-center justify-between">
        <CosDropdown
          label="Vendor"
          size="md"
          type="radio"
          variant="regular"
          selectedItems={selectedVendor ? [selectedVendor] : []}
          isLoading={formState.isInputLoading}
          disabled={formState.isInputDisabled || formState.isEdit}
        >
          <CosDropdown.Trigger placeholder="Select an Item">
            {selectedVendor || 'Select a vendor'}
          </CosDropdown.Trigger>
          <CosDropdown.Menu>
            {vendorOptions.map((vendor) => (
              <CosDropdown.Item
                key={vendor}
                item={vendor}
                onClick={() => onVendorChange(vendor)}
              >
                {vendor}
              </CosDropdown.Item>
            ))}
          </CosDropdown.Menu>
        </CosDropdown>
        {!formState.isInputLoading && (
          <CosHyperlink
            variant="text-inline"
            onClick={() => {
              window.open(
                CosRoutesEnum.INTEGRATIONS_STORAGES_MODELS_PAGE,
                '_blank',
              )
            }}
          >
            Model List
          </CosHyperlink>
        )}
      </div>
      <CosDropdown
        label="Name"
        size="md"
        type="radio"
        variant="regular"
        selectedItems={selectedModelName ? [selectedModelName] : []}
        isLoading={formState.isInputLoading}
        disabled={formState.isInputDisabled || formState.isEdit}
      >
        <CosDropdown.Trigger
          placeholder="Select an Item"
          className="max-w-full"
        >
          {selectedModelName || 'Select a model'}
        </CosDropdown.Trigger>
        <CosDropdown.Menu className="max-w-full">
          {modelOptions.map((item) => (
            <CosDropdown.Item
              key={item.driver}
              item={item.driver}
              onClick={() => onModelNameChange(item.driver)}
            >
              {item.driver}
            </CosDropdown.Item>
          ))}
        </CosDropdown.Menu>
      </CosDropdown>
    </StorageFormSection>
  )
}
