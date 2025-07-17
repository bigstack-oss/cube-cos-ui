import UploadIcon from '@cube-frontend/ui-library/icons/monochrome/upload.svg?react'
import { GetTriggerMaterialsResponseDataResponseScriptTypes } from '@cube-frontend/api'
import { CosButton, CosModal, CosStroke } from '@cube-frontend/ui-library'
import { LogConsole } from '@cube-frontend/web-app/components/LogConsole'
import { ScriptFile, UpsertTriggersPayload } from '../../../upsertTriggersUtils'
import { FilePathCard } from './FilePathCard'
import { useUploadScript } from './useUploadScript'

type PersonalizedScriptModalProps = {
  isModalOpen: boolean
  payload: UpsertTriggersPayload
  scriptTypes: GetTriggerMaterialsResponseDataResponseScriptTypes | undefined
  onScriptChange: (file: ScriptFile) => void
  onModalClose: () => void
}

export const PersonalizedScriptModal = (
  props: PersonalizedScriptModalProps,
) => {
  const {
    isModalOpen,
    payload,
    scriptTypes,
    onScriptChange,
    onModalClose: onModalCloseProps,
  } = props

  const {
    fileInputRef: scriptFileInputRef,
    scriptInfo,
    errorMessage,
    showScriptTestResult,
    onFileChange,
    onUploadScriptButtonClick,
    onTestRunningButtonClick,
    onActionClick,
    onFileInputClear,
  } = useUploadScript({ payload, onVerifyScriptSuccess: onScriptChange })

  const isScriptValid = showScriptTestResult.status === 'testSucceeded'

  const onModalClose = () => {
    onFileInputClear()
    onModalCloseProps()
  }

  const renderFilePath = () => {
    if (!scriptInfo) return null
    return (
      <FilePathCard disabled={false} onCancel={onFileInputClear}>
        {scriptInfo.fileName}
      </FilePathCard>
    )
  }

  const renderTestResult = () => {
    if (showScriptTestResult.status === 'untested') return null

    return (
      <LogConsole title={{ label: 'Test Result' }}>
        {showScriptTestResult.message ?? ''}
      </LogConsole>
    )
  }

  return (
    <CosModal
      isOpen={isModalOpen}
      title="Personalized Script"
      actionText="Set Response"
      onActionClick={onActionClick}
      onCloseClick={onModalClose}
      actionButtonProps={{ disabled: !isScriptValid }}
      className="h-[490px]"
    >
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-4">
            <CosButton
              size="lg"
              type="secondary"
              usage="icon-left"
              Icon={UploadIcon}
              onClick={onUploadScriptButtonClick}
            >
              {`Upload ${scriptTypes?.types?.[0] ?? ''} Script`}
            </CosButton>
            <input
              ref={scriptFileInputRef}
              type="file"
              className="hidden"
              onChange={onFileChange}
            />
            <p className="primary-body2 text-functional-text">
              {`OS: ${scriptTypes?.environments[0] ?? '-'}`}
            </p>
          </div>
          {errorMessage && (
            <p className="primary-body3 text-status-negative">{errorMessage}</p>
          )}
        </div>
        {renderFilePath()}
        <CosStroke type="dot" />
        <CosButton
          size="lg"
          onClick={onTestRunningButtonClick}
          disabled={!scriptInfo}
          className="w-fit"
        >
          Test Running
        </CosButton>
        {renderTestResult()}
      </div>
    </CosModal>
  )
}
