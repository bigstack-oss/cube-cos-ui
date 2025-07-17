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
import { ScriptFile, UpsertTriggersPayload } from '../../../upsertTriggersUtils'

const MAX_SIZE_IN_BYTES = 10 * 1024 * 1024 // 10 MiB

type TestResult = {
  status: 'untested' | 'testing' | 'testSucceeded' | 'testFailed'
  message?: string
}

type UseUploadScriptOptions = {
  payload: UpsertTriggersPayload
  onVerifyScriptSuccess: (file: ScriptFile) => void
}

type UseUploadScript = {
  fileInputRef: React.RefObject<HTMLInputElement | null>
  scriptInfo: ScriptFile | undefined
  errorMessage: string
  showScriptTestResult: TestResult
  onFileChange: ChangeEventHandler<HTMLInputElement>
  onUploadScriptButtonClick: () => void
  onTestRunningButtonClick: () => void
  onActionClick: () => void
  onFileInputClear: () => void
}

export const useUploadScript = (
  options: UseUploadScriptOptions,
): UseUploadScript => {
  const { payload, onVerifyScriptSuccess } = options

  const { dataCenter } = useContext(DataCenterContext)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [scriptInfo, setScriptInfo] = useState<ScriptFile | undefined>(
    payload.script,
  )

  const [errorMessage, setErrorMessage] = useState('')

  const [showScriptTestResult, setShowScriptTestResult] = useState<TestResult>({
    status: 'untested',
    message: undefined,
  })

  useEffect(() => {
    // Script needs to be tested successfully to be added to payload.
    // If there is an existing script in payload, it means it's already been tested and passed.
    // Thus, mark the test result as succeeded by default.
    if (payload.script) {
      setScriptInfo(payload.script)
      setShowScriptTestResult({
        status: 'testSucceeded',
        message: undefined,
      })
    }
  }, [payload.script])

  const onUploadScriptButtonClick = () => {
    fileInputRef.current?.click()
  }

  const onFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setErrorMessage('')

    const scriptFile = e.target.files?.[0]
    if (!scriptFile) {
      return
    }

    if (scriptFile.size > MAX_SIZE_IN_BYTES) {
      setErrorMessage('File is too large. Maximum allowed size is 10MiB.')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
        setScriptInfo(undefined)
        setShowScriptTestResult({
          status: 'untested',
          message: undefined,
        })
      }
      return
    }

    try {
      const base64 = await fileToBase64(scriptFile)
      setScriptInfo({
        fileName: scriptFile.name,
        content: base64,
      })
      setShowScriptTestResult({
        status: 'untested',
        message: undefined,
      })
    } catch {
      setErrorMessage('Failed to read script file.')
    } finally {
      const input = fileInputRef.current
      if (input) {
        // Clear input to allow re-uploading the same file
        input.value = ''
      }
    }
  }

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

      setShowScriptTestResult({
        status: 'testSucceeded',
        message: testResult.data.msg,
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

  const onFileInputClear = () => {
    setScriptInfo(undefined)
    setErrorMessage('')
    setShowScriptTestResult({
      status: 'untested',
      message: undefined,
    })
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
    onFileInputClear,
  }
}
