import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { produce } from 'immer'
import { CosCheckbox } from '@cube-frontend/ui-library'
import { StorageForm } from '../../storageFormUtils'
import { StorageFormState } from '../StorageDetailsForm'
import { StorageFormSection } from '../StorageFormSection'

export type ImageSectionProps = {
  storage: StorageForm
  setStorage: React.Dispatch<React.SetStateAction<StorageForm>>
  formState: StorageFormState
}

export const ImageSection = (props: ImageSectionProps) => {
  const { storage, setStorage, formState } = props

  const imageSection = storage.storage.image

  const handleImageFieldChange = useCallback(
    <Key extends keyof StorageForm['storage']['image']>(
      key: Key,
      value: boolean,
    ) => {
      setStorage((prev) => {
        return produce(prev, (draft) => {
          draft.storage.image[key] = value
        })
      })
    },
    [setStorage],
  )

  const { t } = useTranslation()

  return (
    <StorageFormSection title={t('integrations.storages.upsert.imageSettings')}>
      <div className="flex gap-x-4">
        <CosCheckbox
          color="primary"
          label="useMultipath"
          checked={imageSection.useMultipath}
          isLoading={formState.isInputLoading}
          disabled={formState.isInputDisabled}
          onChange={(e) =>
            handleImageFieldChange('useMultipath', e.target.checked)
          }
        />
        <CosCheckbox
          color="primary"
          label="forceMultipath"
          checked={imageSection.forceMultipath}
          isLoading={formState.isInputLoading}
          disabled={formState.isInputDisabled}
          onChange={(e) =>
            handleImageFieldChange('forceMultipath', e.target.checked)
          }
        />
      </div>
    </StorageFormSection>
  )
}
