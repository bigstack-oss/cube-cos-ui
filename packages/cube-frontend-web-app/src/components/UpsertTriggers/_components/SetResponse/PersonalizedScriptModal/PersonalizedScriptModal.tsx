import AddSquare from '@cube-frontend/ui-library/icons/monochrome/add_square.svg?react'
import UploadIcon from '@cube-frontend/ui-library/icons/monochrome/upload.svg?react'
import { CosButton, CosModal } from '@cube-frontend/ui-library'
import { useUploadScript } from './useUploadScript'

type PersonalizedScriptModalProps = {
  isModalOpen: boolean
  onPersonalizedScriptSelect: (file: File) => void
  onModelOpen: () => void
  onModelClose: () => void
}

export const PersonalizedScriptModal = (
  props: PersonalizedScriptModalProps,
) => {
  const { isModalOpen, onPersonalizedScriptSelect, onModelOpen, onModelClose } =
    props

  const {
    fileInputRef: scriptFileInputRef,
    scriptInfo,
    showScriptTestResult,
    handleFileChange,
    handleUploadScriptButtonClick,
    clearFileInput,
  } = useUploadScript()

  const onImportScriptModalClose = () => {
    clearFileInput()
    onModelClose()
  }

  const onActionClick = () => {
    const scriptFile = scriptFileInputRef.current?.files?.[0]
    if (!scriptFile) {
      return
    }
    onPersonalizedScriptSelect(scriptFile)
    onImportScriptModalClose()
  }

  return (
    <div>
      <CosButton
        type="ghost"
        usage="icon-left"
        Icon={AddSquare}
        onClick={onModelOpen}
      >
        Personalized Script
      </CosButton>
      <CosModal
        isOpen={isModalOpen}
        title="Personalized Script"
        actionText="Set Response"
        onActionClick={onActionClick}
        onCloseClick={onImportScriptModalClose}
        className="h-[490px]"
      >
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-4">
              <CosButton
                size="lg"
                type="secondary"
                usage="icon-left"
                Icon={UploadIcon}
                onClick={handleUploadScriptButtonClick}
              >
                Upload Bash Script
              </CosButton>
              <input
                ref={scriptFileInputRef}
                type="file"
                className="hidden"
                // accept=".license"
                onChange={handleFileChange}
              />
              <p className="primary-body2 text-functional-text">
                OS: Alpine Linux
              </p>
            </div>
            <p className="primary-body2 text-functional-text">{scriptInfo}</p>
          </div>
          <CosButton size="lg" onClick={onModelOpen} className="w-fit">
            Test Running
          </CosButton>
          {showScriptTestResult && (
            <p className="primary-body2 text-functional-text">
              {showScriptTestResult}
            </p>
          )}
        </div>
      </CosModal>
    </div>
  )
}
