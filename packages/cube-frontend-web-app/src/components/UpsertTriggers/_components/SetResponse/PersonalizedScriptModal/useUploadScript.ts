import {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { fileToBase64 } from '@cube-frontend/web-app/utils/file'
import { ScriptFile, UpsertTriggersPayload } from '../../../upsertTriggersUtils'

type TestResult = {
  status: 'untested' | 'testing' | 'testSucceeded' | 'testFailed'
  message?: string
}

type UseUploadScriptOptions = {
  payload: UpsertTriggersPayload
}

type UseUploadScript = {
  fileInputRef: React.RefObject<HTMLInputElement | null>
  scriptInfo: ScriptFile | undefined
  showScriptTestResult: TestResult
  handleFileChange: ChangeEventHandler<HTMLInputElement>
  handleUploadScriptButtonClick: () => void
  handleTestRunningButtonClick: () => void
  clearFileInput: () => void
  clearScriptTestResult: () => void
}

export const useUploadScript = (
  options: UseUploadScriptOptions,
): UseUploadScript => {
  const { payload } = options

  const { dataCenter } = useContext(DataCenterContext)

  // TODO: Upload script with useCosMutationRequest here

  const fileInputRef = useRef<HTMLInputElement>(null)

  // TODO: Handle script upload and test script logic here
  const [scriptInfo, setScriptInfo] = useState<ScriptFile | undefined>(
    payload.script,
  )

  const [showScriptTestResult, setShowScriptTestResult] = useState<TestResult>({
    status: 'untested',
    message: undefined,
  })

  useEffect(() => {
    setScriptInfo(payload.script)
    setShowScriptTestResult({
      status: payload.script ? 'testSucceeded' : 'untested',
      message: payload.script ? 'Script is ready.' : undefined,
    })
  }, [payload.script])

  const handleUploadScriptButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const scriptFile = e.target.files?.[0]
    if (!scriptFile) {
      return
    }

    try {
      const base64 = await fileToBase64(scriptFile)
      setScriptInfo({
        name: scriptFile.name,
        base64,
      })
      setShowScriptTestResult({
        status: 'untested',
        message: undefined,
      })
    } catch {
      console.error('Failed to read script file.')
    }
  }

  const handleTestRunningButtonClick = () => {
    setShowScriptTestResult({
      status: 'testing',
      message: 'Running script test...',
    })

    setTimeout(() => {
      // Simulate script test result
      const isSuccess = Math.random() > 0.5
      const result: TestResult = isSuccess
        ? { status: 'testSucceeded', message: 'Script test succeeded.' }
        : { status: 'testFailed', message: 'Script test failed.' }

      setShowScriptTestResult(result)
    }, 2000)
  }

  const clearFileInput = () => {
    if (fileInputRef.current?.value) {
      fileInputRef.current.value = ''
      setScriptInfo(undefined)
    }
  }

  const clearScriptTestResult = () => {
    setShowScriptTestResult({
      status: 'untested',
      message: undefined,
    })
  }

  return {
    fileInputRef,
    scriptInfo,
    showScriptTestResult,
    handleFileChange,
    handleUploadScriptButtonClick,
    handleTestRunningButtonClick,
    clearFileInput,
    clearScriptTestResult,
  }
}
