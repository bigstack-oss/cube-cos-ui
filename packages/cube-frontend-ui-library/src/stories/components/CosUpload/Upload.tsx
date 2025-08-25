import {
  CosButton,
  CosHyperlink,
  CosModal,
  CosStroke,
  CosUpload,
} from '@cube-frontend/ui-library'
import {
  ChangeEventHandler,
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react'
import { twMerge } from 'tailwind-merge'

type UploadProps = {
  insideModal?: boolean
  isLoading: boolean
  isUploaded: boolean
}

export const Upload = ({
  insideModal = false,
  isLoading,
  isUploaded,
}: UploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  const [internalLoading, setInternalLoading] = useState<boolean>(!!isLoading)

  const [hasTested, setHasTested] = useState(false)

  const [fileName, setFileName] = useState(() =>
    isUploaded ? '/Scripts/fake_automation.command' : '',
  )

  useEffect(() => {
    setInternalLoading(!!isLoading)
  }, [isLoading])

  useEffect(() => {
    setFileName(isUploaded ? '/Scripts/fake_bath_automation.command' : '')
  }, [isUploaded])

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInternalLoading(true)
    const scriptFile = e.target.files?.[0]

    if (!scriptFile) {
      setInternalLoading(false)
      return
    }

    setTimeout(() => {
      setFileName(scriptFile.name)
      setInternalLoading(false)
    }, 3000)

    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleFileCancel = () => {
    setFileName('')
  }

  const handleOpenModal = () => setIsOpen(true)

  const handleCloseModal = () => setIsOpen(false)

  const handleTestClick = () => {
    setInternalLoading(true)
    setTimeout(() => {
      setHasTested(true)
      setInternalLoading(false)
    }, 5000)
  }

  const renderUploadedFile = () => {
    if (!fileName) return null
    return (
      <CosUpload.File disabled={internalLoading} onCancel={handleFileCancel}>
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
          {internalLoading ? 'Testing...' : 'Test Result'}
        </div>
      </div>
    )
  }

  const renderUploadSection = () => (
    <CosUpload
      disabled={internalLoading}
      button={<CosButton onClick={handleUploadClick}>Upload File</CosButton>}
      input={
        <input ref={fileInputRef} type="file" onChange={handleFileChange} />
      }
      leftSlot={
        <div className="primary-body2 text-functional-text">
          OS: Operating System
        </div>
      }
      rightSlot={
        <CosHyperlink variant="text-inline" href="#">
          View example
        </CosHyperlink>
      }
    >
      {renderUploadedFile()}
    </CosUpload>
  )

  if (!insideModal) return renderUploadSection()

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
        actionButtonProps={{ disabled: !fileName || internalLoading }}
      >
        <div className="flex flex-col gap-8">
          {renderUploadSection()}
          <CosStroke type="dot" />
          <CosButton
            usage="text-only"
            className="w-fit"
            disabled={!fileName || internalLoading}
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
