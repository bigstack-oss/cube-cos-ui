import { CosCheckbox, CosModal } from '@cube-frontend/ui-library'
import { SupportFileRow } from '../MaintenanceSupportFilesPage'
import { SupportFile } from '@cube-frontend/api'
import { useState } from 'react'
import { download } from '@cube-frontend/web-app/utils/download'

type DownloadSupportFilesModalProps = {
  isOpen: boolean
  supportFiles: SupportFileRow
  onCloseClick: () => void
}

export const DownloadSupportFilesModal = (
  props: DownloadSupportFilesModalProps,
) => {
  const { isOpen, supportFiles, onCloseClick } = props

  const [selectedFiles, setSelectedFiles] = useState<SupportFile[]>([])

  const handleDownload = () => {
    selectedFiles.forEach((file) => download(file.url, file.name))
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
      title="Choose hosts to download support files"
      size="sm"
      isOpen={isOpen}
      actionText="Download"
      actionButtonProps={{ disabled: selectedFiles.length === 0 }}
      onActionClick={handleDownload}
      onCloseClick={onCloseClick}
    >
      <div className="flex flex-col gap-y-5">
        <p className="primary-body2 font-semibold text-functional-text">
          {supportFiles.name}
        </p>
        <div className="grid grid-cols-4 gap-y-3">
          <CosCheckbox
            label="Select all"
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
