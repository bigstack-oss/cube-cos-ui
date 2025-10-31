import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CosCheckbox, CosModal } from '@cube-frontend/ui-library'
import { SupportFile } from '@cube-frontend/api'
import { SupportFileRow } from '../MaintenanceSupportFilesPage'
import { formatSupportFilesTimestamp } from '@cube-frontend/web-app/utils/date'

type DownloadSupportFilesModalProps = {
  isOpen: boolean
  supportFiles: SupportFileRow
  onCloseClick: () => void
}

export const DownloadSupportFilesModal = (
  props: DownloadSupportFilesModalProps,
) => {
  const { isOpen, supportFiles, onCloseClick } = props

  const { t } = useTranslation()

  const [selectedFiles, setSelectedFiles] = useState<SupportFile[]>([])

  const handleDownload = () => {
    selectedFiles.forEach((file) => window.open(file.url, '_blank'))
    onCloseClick()
  }

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedFiles(supportFiles.files)
    } else {
      setSelectedFiles([])
    }
  }

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    file: SupportFile,
  ) => {
    if (e.target.checked) {
      setSelectedFiles((prev) => [...prev, file])
    } else {
      setSelectedFiles((prev) =>
        prev.filter(
          (selectedFile) => selectedFile.source.host !== file.source.host,
        ),
      )
    }
  }

  return (
    <CosModal
      title={t('maintenance.supportFiles.downloadModal.title')}
      size="sm"
      isOpen={isOpen}
      footerMessage={t('maintenance.supportFiles.downloadModal.footerMessage')}
      actionText={t('maintenance.supportFiles.downloadModal.download')}
      actionButtonProps={{ disabled: selectedFiles.length === 0 }}
      onActionClick={handleDownload}
      onCloseClick={onCloseClick}
    >
      <div className="flex flex-col gap-y-5">
        <p className="primary-body2 font-semibold text-functional-text">
          {formatSupportFilesTimestamp(supportFiles.status.createdAt)}
        </p>
        <div className="grid grid-cols-4 gap-y-3">
          <CosCheckbox
            label={t('maintenance.supportFiles.downloadModal.selectAll')}
            className="w-fit"
            checked={selectedFiles.length === supportFiles.files.length}
            onChange={handleSelectAll}
          />
          {supportFiles.files.map((file) => (
            <CosCheckbox
              className="w-fit"
              key={file.source.host}
              label={file.source.host}
              checked={selectedFiles.some(
                (selectedFile) => selectedFile.source.host === file.source.host,
              )}
              onChange={(e) => handleSelect(e, file)}
            />
          ))}
        </div>
      </div>
    </CosModal>
  )
}
