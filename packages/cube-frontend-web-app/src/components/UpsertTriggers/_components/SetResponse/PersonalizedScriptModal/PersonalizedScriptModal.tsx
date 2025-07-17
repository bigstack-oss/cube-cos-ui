import { useEffect, useRef } from 'react'
import UploadIcon from '@cube-frontend/ui-library/icons/monochrome/upload.svg?react'
import {
  GetTriggerMaterialsResponseDataResponseScriptType,
  TriggerResponseScript,
} from '@cube-frontend/api'
import { CosButton, CosModal, CosStroke } from '@cube-frontend/ui-library'
import { LogConsole } from '@cube-frontend/web-app/components/LogConsole'
import { UpsertTriggersPayload } from '../../../upsertTriggersUtils'
import { FilePathCard } from './FilePathCard'
import { useUploadScript } from './useUploadScript'

type PersonalizedScriptModalProps = {
  isModalOpen: boolean
  payload: UpsertTriggersPayload
  scriptType: GetTriggerMaterialsResponseDataResponseScriptType
  onScriptChange: (file: TriggerResponseScript) => void
  onModalClose: () => void
}

export const PersonalizedScriptModal = (
  props: PersonalizedScriptModalProps,
) => {
  const {
    isModalOpen,
    payload,
    scriptType,
    onScriptChange,
    onModalClose: closeModal,
  } = props

  const modalBodyRef = useRef<HTMLDivElement | null>(null)

  const {
    fileInputRef: scriptFileInputRef,
    scriptInfo,
    errorMessage,
    showScriptTestResult,
    onFileChange,
    onUploadScriptButtonClick,
    onTestRunningButtonClick,
    onActionClick: addScriptToPayload,
    onScriptClear,
  } = useUploadScript({
    isModalOpen,
    script: payload.script,
    onVerifyScriptSuccess: onScriptChange,
  })

  /**
   * Automatically scrolls the modal body to the bottom
   * when the script test is available
   */
  useEffect(() => {
    if (!isModalOpen || !showScriptTestResult.message) return

    const modalBody = modalBodyRef.current
    if (!modalBody) return

    modalBody.scrollTo({ behavior: 'smooth', top: modalBody.scrollHeight })
  }, [isModalOpen, showScriptTestResult.message])

  const isValidating = showScriptTestResult.status === 'testing'

  const isScriptValid = showScriptTestResult.status === 'testSucceeded'

  const onModalCloseWithoutAddingScriptToPayload = () => {
    onScriptClear()
    closeModal()
  }

  const onActionClick = () => {
    addScriptToPayload()
    onScriptClear()
    closeModal()
  }

  const renderFilePath = () => {
    if (!scriptInfo?.content || !scriptInfo.name) return null
    return (
      <>
        <FilePathCard
          disabled={showScriptTestResult.status === 'testing'}
          onCancel={onScriptClear}
        >
          {scriptInfo.name}
        </FilePathCard>
      </>
    )
  }

  const renderTestResult = () => {
    if (
      !scriptInfo ||
      showScriptTestResult.status === 'untested' ||
      !showScriptTestResult.message
    )
      return null

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
      onCloseClick={onModalCloseWithoutAddingScriptToPayload}
      actionButtonProps={{ disabled: isValidating || !isScriptValid }}
      bodyRef={modalBodyRef}
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
              disabled={isValidating}
              onClick={onUploadScriptButtonClick}
            >
              {`Upload ${scriptType.language} Script`}
            </CosButton>
            <input
              ref={scriptFileInputRef}
              type="file"
              className="hidden"
              onChange={onFileChange}
            />
            <p className="primary-body2 text-functional-text">
              {`OS: ${scriptType.environment}`}
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
          loading={isValidating}
          disabled={!scriptInfo}
          onClick={onTestRunningButtonClick}
          className="w-fit"
        >
          Test Running
        </CosButton>
        {renderTestResult()}
      </div>
    </CosModal>
  )
}
