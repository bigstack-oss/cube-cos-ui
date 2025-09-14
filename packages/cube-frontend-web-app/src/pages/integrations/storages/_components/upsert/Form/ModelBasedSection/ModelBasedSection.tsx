import { CosStroke } from '@cube-frontend/ui-library'
import { StorageForm, StorageFormError } from '../../storageFormUtils'
import { DriverSection } from './DriverSection'
import { ExtraSettingsSection } from './ExtraSettingsSection'
import { ExtraConfigFileSection } from './ExtraConfigFileSection'
import { VolumeTypeSection } from './VolumeTypeSection'
import { ImageSection } from './ImageSection'
import { StorageFormState } from '../StorageDetailsForm'
import { ListIntegrationStorageModelsResponseDataInner } from '@cube-frontend/api'

export type ModelBasedSectionProps = {
  baseModel: ListIntegrationStorageModelsResponseDataInner | undefined
  storage: StorageForm
  setStorage: React.Dispatch<React.SetStateAction<StorageForm>>
  formState: StorageFormState
  fieldErrors: StorageFormError | undefined
}

export const ModelBasedSection = (props: ModelBasedSectionProps) => {
  const { baseModel, storage, setStorage, formState, fieldErrors } = props
  const { service, volumeType } = storage.storage
  const { driverSection, extraSettings, extraConfigFiles } = service
  const { settings: volumeTypeSettings } = volumeType

  const showDriverSection = driverSection && driverSection.length > 0
  const showExtraSettings = extraSettings && extraSettings.length > 0
  const showExtraConfigFiles = extraConfigFiles && extraConfigFiles.length > 0
  const showVolumeTypeSettings =
    volumeTypeSettings && volumeTypeSettings.length > 0

  return (
    <>
      {baseModel && (
        <ImageSection
          storage={storage}
          setStorage={setStorage}
          formState={formState}
        />
      )}
      {showDriverSection && (
        <>
          <CosStroke type="regular" />
          <DriverSection
            storage={storage}
            setStorage={setStorage}
            formState={formState}
            fieldErrors={fieldErrors}
          />
        </>
      )}

      {showVolumeTypeSettings && (
        <>
          <CosStroke type="regular" />
          <VolumeTypeSection
            storage={storage}
            setStorage={setStorage}
            formState={formState}
            fieldErrors={fieldErrors}
          />
        </>
      )}
      {showExtraSettings && (
        <>
          <CosStroke type="regular" />
          <ExtraSettingsSection
            storage={storage}
            setStorage={setStorage}
            formState={formState}
            fieldErrors={fieldErrors}
          />
        </>
      )}
      {showExtraConfigFiles && (
        <>
          <CosStroke type="regular" />
          <ExtraConfigFileSection
            storage={storage}
            setStorage={setStorage}
            formState={formState}
            fieldErrors={fieldErrors}
          />
        </>
      )}
    </>
  )
}
