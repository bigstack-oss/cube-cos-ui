import AddSquare from '@cube-frontend/ui-library/icons/monochrome/add_square.svg?react'
import UploadIcon from '@cube-frontend/ui-library/icons/monochrome/upload.svg?react'
import { CosButton, CosModal } from '@cube-frontend/ui-library'
import { useUploadScript } from './useUploadScript'
import { ScriptFile, UpsertTriggersPayload } from '../../../upsertTriggersUtils'

type PersonalizedScriptModalProps = {
  isModalOpen: boolean
  payload: UpsertTriggersPayload
  onScriptChange: (file: ScriptFile) => void
  onModelOpen: () => void
  onModelClose: () => void
}

export const PersonalizedScriptModal = (
  props: PersonalizedScriptModalProps,
) => {
  const { isModalOpen, payload, onScriptChange, onModelOpen, onModelClose } =
    props

  const {
    fileInputRef: scriptFileInputRef,
    scriptInfo,
    showScriptTestResult,
    handleFileChange,
    handleUploadScriptButtonClick,
    handleTestRunningButtonClick,
    clearFileInput,
    clearScriptTestResult,
  } = useUploadScript({ payload })

  const isScriptValid = showScriptTestResult.status === 'testSucceeded'

  const onImportScriptModalClose = () => {
    clearFileInput()
    clearScriptTestResult()
    onModelClose()
  }

  const onActionClick = () => {
    if (!scriptInfo) {
      return
    }
    onScriptChange(scriptInfo)
    onModelClose()
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
        actionButtonProps={{ disabled: !isScriptValid }}
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
                onChange={handleFileChange}
              />
              <p className="primary-body2 text-functional-text">
                OS: Alpine Linux
              </p>
            </div>
            <div className="primary-body2 w-full break-all text-functional-text">
              {scriptInfo?.name || payload.script?.name}
            </div>
          </div>
          <CosButton
            size="lg"
            onClick={handleTestRunningButtonClick}
            className="w-fit"
          >
            Test Running
          </CosButton>
          {showScriptTestResult && (
            <p className="primary-body2 text-functional-text">
              {showScriptTestResult.message}
            </p>
          )}
        </div>
      </CosModal>
    </div>
  )
}
