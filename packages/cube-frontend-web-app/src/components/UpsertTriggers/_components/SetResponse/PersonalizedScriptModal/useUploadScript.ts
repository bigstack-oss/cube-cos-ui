import { useContext, useEffect, useState } from 'react'
import { isAxiosError } from 'axios'
import { upperFirst } from 'lodash'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { fileToBase64 } from '@cube-frontend/web-app/utils/file'
import { triggersApi } from '@cube-frontend/web-app/api/cosApi'
import { TriggerResponseScript } from '@cube-frontend/api'

const MAX_SIZE_IN_BYTES = 10 * 1024 * 1024 // 10 MiB

type TestResult = {
  status: 'untested' | 'testing' | 'testSucceeded' | 'testFailed'
  message?: string
}

type UseUploadScriptOptions = {
  isModalOpen: boolean
  script: TriggerResponseScript | undefined
  onVerifyScriptSuccess: (file: TriggerResponseScript) => void
}

type UseUploadScript = {
  scriptInfo: TriggerResponseScript | undefined
  errorMessage: string
  showScriptTestResult: TestResult
  onFileChange: (file: File | null) => Promise<void>
  onTestRunningButtonClick: () => void
  onActionClick: () => void
  onScriptClear: () => void
}

export const useUploadScript = (
  options: UseUploadScriptOptions,
): UseUploadScript => {
  const { isModalOpen, script, onVerifyScriptSuccess } = options

  const { dataCenter } = useContext(DataCenterContext)

  const [scriptInfo, setScriptInfo] = useState<TriggerResponseScript>()

  const [errorMessage, setErrorMessage] = useState('')

  const [showScriptTestResult, setShowScriptTestResult] = useState<TestResult>({
    status: 'untested',
  })

  /**
   * Sync script info when modal opens or script changes.
   * - If script is undefined: reset state.
   * - If script exists (already tested): mark as succeeded.
   */
  useEffect(() => {
    if (!script) {
      onScriptClear()
      return
    }

    setScriptInfo(script)
    setShowScriptTestResult({ status: 'testSucceeded', message: undefined })
  }, [isModalOpen, script])

  const onScriptClear = () => {
    setScriptInfo(undefined)
    setShowScriptTestResult({ status: 'untested', message: undefined })
    setErrorMessage('')
  }

  /**
   * Handle file input change:
   * - Reject if no file or size exceeds limit
   * - Convert to base64 and update state
   * - Reset test status
   */
  const onFileChange = async (file: File | null) => {
    setErrorMessage('')

    if (!file) return

    if (file.size > MAX_SIZE_IN_BYTES) {
      onScriptClear()
      setErrorMessage('File is too large. Maximum allowed size is 10MiB.')
      return
    }

    try {
      const base64 = await fileToBase64(file)
      setScriptInfo({ name: file.name, content: base64 })
      setShowScriptTestResult({ status: 'untested' })
    } catch {
      setErrorMessage('Failed to read script file.')
    }
  }

  /**
   * Verify script content,
   * and update result based on response.
   */
  const onTestRunningButtonClick = async () => {
    if (!scriptInfo) return

    setShowScriptTestResult({
      status: 'testing',
      message: 'Running script test...',
    })

    try {
      const testResult = await triggersApi.verifyTriggerScript({
        dataCenter: dataCenter!.name,
        verifyMaterialScriptRequest: { script: scriptInfo.content },
      })

      const formattedResult =
        `Script:\n` +
        `${testResult.data.data}\n\n` +
        `Result:\n${upperFirst(testResult.data.msg)}`

      setShowScriptTestResult({
        status: 'testSucceeded',
        message: formattedResult,
      })
    } catch (error) {
      if (isAxiosError(error)) {
        setShowScriptTestResult({
          status: 'testFailed',
          message:
            `${upperFirst(error?.response?.data.status)}\n\n` +
            `${upperFirst(error?.response?.data.msg)}`,
        })
      } else {
        setShowScriptTestResult({
          status: 'testFailed',
          message:
            `Error occurred when verifying script:\n\n` +
            (error || 'Unknown error'),
        })
      }
    }
  }

  const onActionClick = () => {
    if (!scriptInfo) return
    onVerifyScriptSuccess(scriptInfo)
  }

  return {
    scriptInfo,
    errorMessage,
    showScriptTestResult,
    onFileChange,
    onTestRunningButtonClick,
    onActionClick,
    onScriptClear,
  }
}
