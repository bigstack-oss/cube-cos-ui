import {
  CosButton,
  CosHyperlink,
  CosModal,
  CosStroke,
  CosUpload,
} from '@cube-frontend/ui-library'
import { Fragment, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type ModalExampleProps = {
  defaultIsTesting: boolean
  defaultIsUploaded: boolean
}

export const ModalExample = ({
  defaultIsTesting,
  defaultIsUploaded,
}: ModalExampleProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const [isUploading, setIsUploading] = useState(false)

  const [isTesting, setIsTesting] = useState(defaultIsTesting)

  const [hasTested, setHasTested] = useState(false)

  const [fileName, setFileName] = useState(() =>
    defaultIsUploaded ? '/Scripts/fake_automation.command' : '',
  )

  const handleFileChange = (file: File | null) => {
    if (!file) return

    setIsUploading(true)
    setFileName('')

    setTimeout(() => {
      setFileName(file.name)
      setIsUploading(false)
    }, 3000)
  }

  const handleFileCancel = () => {
    setFileName('')
  }

  const handleOpenModal = () => setIsOpen(true)

  const handleCloseModal = () => setIsOpen(false)

  const handleTestClick = () => {
    setIsTesting(true)
    setTimeout(() => {
      setHasTested(true)
      setIsTesting(false)
    }, 5000)
  }

  const renderUploadedFile = () => {
    if (!fileName) return null
    return (
      <CosUpload.File disabled={isTesting} onCancel={handleFileCancel}>
        {fileName}
      </CosUpload.File>
    )
  }

  const renderLogOutput = () => {
    if (!hasTested) return null
    return (
      <div className="flex flex-col">
        <div
          className={twMerge(
            'flex items-center justify-between px-6 py-3',
            'rounded-t-[5px] border border-functional-border-divider bg-scene-background',
          )}
        >
          <div className="primary-body2 cursor-pointer font-semibold text-functional-text">
            Copy
          </div>
        </div>
        <div className="primary-body3 overflow-x-auto whitespace-pre text-wrap rounded-b-[5px] bg-dark-700 px-6 py-4 text-functional-border-darker">
          {isTesting ? 'Testing...' : 'Test Result'}
        </div>
      </div>
    )
  }

  const renderUploadSection = () => (
    <CosUpload
      isUploading={isUploading}
      disabled={isTesting}
      buttonText="Upload File"
      onFileChange={handleFileChange}
      leftSlot={
        <div className="primary-body2 text-functional-text">
          OS: Operating System
        </div>
      }
      rightSlot={
        <CosHyperlink variant="text-inline" href="#" target="_blank">
          View example
        </CosHyperlink>
      }
    >
      {renderUploadedFile()}
    </CosUpload>
  )

  return (
    <Fragment>
      <CosButton usage="text-only" onClick={handleOpenModal}>
        Open
      </CosButton>
      <CosModal
        title="Personalized Script"
        isOpen={isOpen}
        onCloseClick={handleCloseModal}
        onActionClick={() => window.alert('Action!')}
        actionButtonProps={{ disabled: !fileName || isTesting }}
      >
        <div className="flex flex-col gap-8">
          {renderUploadSection()}
          <CosStroke type="dot" />
          <CosButton
            usage="text-only"
            className="w-fit"
            loading={isTesting}
            disabled={!fileName || isTesting}
            onClick={handleTestClick}
          >
            Test
          </CosButton>
          {renderLogOutput()}
        </div>
      </CosModal>
    </Fragment>
  )
}
