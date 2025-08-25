import { useEffect, useRef } from 'react'
import {
  GetTriggerMaterialsResponseDataResponseScriptType,
  TriggerResponseScript,
} from '@cube-frontend/api'
import {
  CosButton,
  CosModal,
  CosStroke,
  CosHyperlink,
  CosUpload,
} from '@cube-frontend/ui-library'
import { LogConsole } from '@cube-frontend/web-app/components/LogConsole'
import { UpsertTriggersPayload } from '../../../upsertTriggersUtils'
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
    scriptInfo,
    errorMessage,
    showScriptTestResult,
    onFileChange,
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
      <CosUpload.File disabled={isValidating} onCancel={onScriptClear}>
        {scriptInfo.name}
      </CosUpload.File>
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

  const hyperlink = (
    <CosHyperlink
      variant="text-inline"
      href="https://bigstack-oss.github.io/bigstack-document/docs/knowledge-base/cubecos/custom-scripts-for-triggers#sample-script-and-enviornment-information"
      target="_blank"
    >
      View example
    </CosHyperlink>
  )

  const osHint = (
    <p className="primary-body2 text-functional-text">
      {`OS: ${scriptType.environment}`}
    </p>
  )

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
        <CosUpload
          disabled={isValidating}
          buttonText={`Upload ${scriptType.language} Script`}
          leftSlot={osHint}
          rightSlot={hyperlink}
          errorMessage={errorMessage}
          onFileChange={onFileChange}
        >
          {renderFilePath()}
        </CosUpload>
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
