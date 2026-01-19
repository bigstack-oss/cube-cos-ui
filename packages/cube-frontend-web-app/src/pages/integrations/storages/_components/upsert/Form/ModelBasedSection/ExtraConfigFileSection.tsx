import { useTranslation } from 'react-i18next'
import { produce } from 'immer'
import {
  ExtraConfigFilesForm,
  StorageForm,
  StorageFormError,
} from '../../storageFormUtils'
import { StorageFormSection } from '../StorageFormSection'
import { StorageFormState } from '../StorageDetailsForm'
import { ConfigFileUpload } from './ConfigFileUpload'

export type ExtraConfigFileSectionProps = {
  storage: StorageForm
  setStorage: React.Dispatch<React.SetStateAction<StorageForm>>
  formState: StorageFormState
  fieldErrors: StorageFormError | undefined
}

export const ExtraConfigFileSection = (props: ExtraConfigFileSectionProps) => {
  const { storage, setStorage, formState } = props

  const { t } = useTranslation()

  const { extraConfigFiles } = storage.storage.service

  const renderField = (
    extraConfigFile: ExtraConfigFilesForm,
    index: number,
  ) => {
    const handleFieldChange = async (
      localFileName: string,
      fileContent: string,
    ) => {
      setStorage((prev) => {
        return produce(prev, (draft) => {
          draft.storage.service.extraConfigFiles[index].content = fileContent
          draft.storage.service.extraConfigFiles[index].localFileName =
            localFileName
        })
      })
    }

    const handleCancel = () => {
      setStorage((prev) => {
        return produce(prev, (draft) => {
          draft.storage.service.extraConfigFiles[index].content = ''
          draft.storage.service.extraConfigFiles[index].localFileName =
            undefined
        })
      })
    }

    return (
      <ConfigFileUpload
        key={`${index}-${extraConfigFile.name}`}
        disabled={formState.isInputDisabled}
        buttonText={t('integrations.storages.upsert.uploadExtraConfigFile', {
          name: extraConfigFile.name,
        })}
        fileName={extraConfigFile.localFileName}
        onFileChange={handleFieldChange}
        onCancel={handleCancel}
      />
    )
  }

  return (
    <StorageFormSection
      title={t('integrations.storages.upsert.extraConfigFiles')}
    >
      {extraConfigFiles.map(renderField)}
    </StorageFormSection>
  )
}
