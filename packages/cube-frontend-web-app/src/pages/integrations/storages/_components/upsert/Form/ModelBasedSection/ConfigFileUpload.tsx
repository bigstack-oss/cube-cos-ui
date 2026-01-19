import { CosUpload } from '@cube-frontend/ui-library'
import { fileToBase64 } from '@cube-frontend/web-app/utils/file'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const EXTRA_CONFIG_FILE_SIZE_LIMIT_MB = 10
const EXTRA_CONFIG_FILE_SIZE_LIMIT =
  EXTRA_CONFIG_FILE_SIZE_LIMIT_MB * 1024 * 1024

export type ConfigFileUploadProps = {
  buttonText: string
  fileName: string | undefined
  disabled: boolean
  onCancel: () => void
  onFileChange: (fileName: string, fileContent: string) => void
}

export const ConfigFileUpload = (props: ConfigFileUploadProps) => {
  const { buttonText, fileName, disabled, onFileChange, onCancel } = props

  const { t } = useTranslation()

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  )

  const handleFieldChange = async (file: File | null) => {
    if (!file) return

    if (file.size > EXTRA_CONFIG_FILE_SIZE_LIMIT) {
      setErrorMessage(
        t('integrations.storages.upsert.extraConfigFiles.fileSizeOverLimit', {
          size: `${EXTRA_CONFIG_FILE_SIZE_LIMIT_MB} MB`,
        }),
      )
      return
    }

    const fileName = file.name
    const fileContent = await fileToBase64(file)

    onFileChange(fileName, fileContent)
    setErrorMessage(undefined)
  }

  return (
    <CosUpload
      buttonText={buttonText}
      onFileChange={handleFieldChange}
      disabled={disabled}
    >
      {errorMessage && <CosUpload.Error message={errorMessage} />}
      {fileName && (
        <CosUpload.File onCancel={onCancel}>{fileName}</CosUpload.File>
      )}
    </CosUpload>
  )
}
