import {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
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
  fileInputRef: React.RefObject<HTMLInputElement | null>
  scriptInfo: TriggerResponseScript | undefined
  errorMessage: string
  showScriptTestResult: TestResult
  onFileChange: ChangeEventHandler<HTMLInputElement>
  onUploadScriptButtonClick: () => void
  onTestRunningButtonClick: () => void
  onActionClick: () => void
  onScriptClear: () => void
}

export const useUploadScript = (
  options: UseUploadScriptOptions,
): UseUploadScript => {
  const { isModalOpen, script, onVerifyScriptSuccess } = options

  const { dataCenter } = useContext(DataCenterContext)

  const fileInputRef = useRef<HTMLInputElement>(null)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, script])

  const onFileInputClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const onScriptClear = () => {
    setScriptInfo(undefined)
    setShowScriptTestResult({ status: 'untested', message: undefined })
    setErrorMessage('')
    onFileInputClear()
  }

  const onUploadScriptButtonClick = () => {
    fileInputRef.current?.click()
  }

  /**
   * Handle file input change:
   * - Reject if no file or size exceeds limit
   * - Convert to base64 and update state
   * - Reset test status
   */
  const onFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setErrorMessage('')
    const scriptFile = e.target.files?.[0]

    if (!scriptFile) return

    if (scriptFile.size > MAX_SIZE_IN_BYTES) {
      onScriptClear()
      setErrorMessage('File is too large. Maximum allowed size is 10MiB.')
      return
    }

    try {
      const base64 = await fileToBase64(scriptFile)
      setScriptInfo({ name: scriptFile.name, content: base64 })
      setShowScriptTestResult({ status: 'untested' })
    } catch {
      setErrorMessage('Failed to read script file.')
    } finally {
      // Allow re-uploading the same file
      onFileInputClear()
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

      const formattedResult = `Script:\n${testResult.data.data}\n\nResult:\n${testResult.data.msg}`

      setShowScriptTestResult({
        status: 'testSucceeded',
        message: formattedResult,
      })
    } catch (error) {
      setShowScriptTestResult({
        status: 'testFailed',
        message: 'Error occurred when verifying script: ' + error,
      })
    }
  }

  const onActionClick = () => {
    if (!scriptInfo) return
    onVerifyScriptSuccess(scriptInfo)
  }

  return {
    fileInputRef,
    scriptInfo,
    errorMessage,
    showScriptTestResult,
    onFileChange,
    onUploadScriptButtonClick,
    onTestRunningButtonClick,
    onActionClick,
    onScriptClear,
  }
}
