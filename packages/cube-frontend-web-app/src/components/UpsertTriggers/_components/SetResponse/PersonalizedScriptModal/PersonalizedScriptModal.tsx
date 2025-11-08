import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  GetTriggerMaterialsResponseDataResponseScriptType,
  TriggerResponseScript,
} from '@cube-frontend/api'
import {
  CosButton,
  CosHyperlink,
  CosLogConsole,
  CosModal,
  CosStroke,
  CosUpload,
} from '@cube-frontend/ui-library'
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

  const { t } = useTranslation()

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
      <CosLogConsole
        title={{
          label: t('events.triggers.upsert.personalizedScript.testResult'),
        }}
      >
        {showScriptTestResult.message ?? ''}
      </CosLogConsole>
    )
  }

  const hyperlink = (
    <CosHyperlink
      variant="text-inline"
      href="https://bigstack-oss.github.io/bigstack-document/docs/knowledge-base/cubecos/custom-scripts-for-triggers#sample-script-and-enviornment-information"
      target="_blank"
    >
      {t('events.triggers.upsert.personalizedScript.viewExample')}
    </CosHyperlink>
  )

  const osHint = (
    <p className="primary-body2 text-functional-text">
      {`${t('events.triggers.upsert.personalizedScript.os')}: ${scriptType.environment}`}
    </p>
  )

  return (
    <CosModal
      isOpen={isModalOpen}
      title={t('events.triggers.upsert.personalizedScript')}
      actionText={t('events.triggers.upsert.personalizedScript.setResponse')}
      onActionClick={onActionClick}
      onCloseClick={onModalCloseWithoutAddingScriptToPayload}
      actionButtonProps={{ disabled: isValidating || !isScriptValid }}
      bodyRef={modalBodyRef}
    >
      <div className="flex flex-col gap-y-8">
        <CosUpload
          disabled={isValidating}
          buttonText={t(
            'events.triggers.upsert.personalizedScript.uploadScript',
            { language: scriptType.language },
          )}
          leftSlot={osHint}
          rightSlot={hyperlink}
          onFileChange={onFileChange}
        >
          {renderFilePath()}
          {!!errorMessage && <CosUpload.Error message={errorMessage} />}
        </CosUpload>
        <CosStroke type="dot" />
        <CosButton
          size="lg"
          loading={isValidating}
          disabled={!scriptInfo}
          onClick={onTestRunningButtonClick}
          className="w-fit"
        >
          {t('events.triggers.upsert.personalizedScript.testRunning')}
        </CosButton>
        {renderTestResult()}
      </div>
    </CosModal>
  )
}
