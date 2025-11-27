import { useTranslation } from 'react-i18next'
import { produce } from 'immer'
import {
  ListIntegrationStorageModelsResponseDataInnerMultipathInnerAttributesInner,
  ListIntegrationStorageModelsResponseDataInnerStorageServiceExtraSettingsInner,
} from '@cube-frontend/api'
import { StorageForm, StorageFormError } from '../../storageFormUtils'
import { StorageFormSection } from '../StorageFormSection'
import { StorageFormState } from '../StorageDetailsForm'
import { StorageInput } from '../StorageInput'

export type ExtraSettingsSectionProps = {
  storage: StorageForm
  setStorage: React.Dispatch<React.SetStateAction<StorageForm>>
  formState: StorageFormState
  fieldErrors: StorageFormError | undefined
}

export const ExtraSettingsSection = (props: ExtraSettingsSectionProps) => {
  const { storage, setStorage, formState, fieldErrors } = props

  const { extraSettings } = storage.storage.service
  const extraSettingsErrors = fieldErrors?.storage?.service?.extraSettings

  const renderField = (
    sectionIndex: number,
    fieldIndex: number,
    field: ListIntegrationStorageModelsResponseDataInnerMultipathInnerAttributesInner,
  ) => {
    const value = extraSettings[sectionIndex].settings[fieldIndex].value
    const errorMessage =
      extraSettingsErrors?.[sectionIndex]?.settings?.[fieldIndex]?.value
        ?._errors[0]

    const handleChange = (newValue: string) => {
      setStorage((prev) => {
        return produce(prev, (draft) => {
          draft.storage.service.extraSettings[sectionIndex].settings[
            fieldIndex
          ].value = newValue
        })
      })
    }

    return (
      <div key={`${sectionIndex}-${field.key}`} className="flex-1">
        <StorageInput
          label={field.key}
          value={value}
          errorMessage={errorMessage}
          disabled={formState.isInputDisabled}
          isLoading={formState.isInputLoading}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    )
  }

  const renderSection = (
    extraSettingsSection: ListIntegrationStorageModelsResponseDataInnerStorageServiceExtraSettingsInner,
    sectionIndex: number,
  ) => {
    const { sectionHeader } = extraSettingsSection
    return (
      <div
        key={`${sectionIndex}-${sectionHeader}`}
        className="flex items-center justify-between gap-x-4"
      >
        <div className="primary-h5 min-w-[120px] text-functional-title">
          {sectionHeader}
        </div>
        <div className="flex flex-1 gap-x-4">
          {extraSettingsSection.settings.map((field, fieldIndex) =>
            renderField(sectionIndex, fieldIndex, field),
          )}
        </div>
      </div>
    )
  }

  const { t } = useTranslation()

  return (
    <StorageFormSection
      title={t('integrations.storages.upsert.extraSettings')}
      className="gap-y-8"
    >
      {extraSettings.map(renderSection)}
    </StorageFormSection>
  )
}
