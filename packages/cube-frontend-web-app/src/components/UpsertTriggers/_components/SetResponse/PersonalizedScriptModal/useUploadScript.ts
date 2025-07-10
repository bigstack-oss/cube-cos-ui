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

  const [showScriptTestResult, setShowScriptTestResult] = useState<TestResult>({
    status: 'untested',
    message: undefined,
  })

  useEffect(() => {
    /**
     * Script needs to be tested successfully to be added to payload.
     * If there is an existing script in payload, it means it's already been tested and passed.
     * Thus, mark the test result as succeeded by default.
     */
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
    const scriptFile = e.target.files?.[0]
    if (!scriptFile) {
      return
    }

    try {
      const base64 = await fileToBase64(scriptFile)
      setScriptInfo({
        filePath: scriptFile.name,
        content: base64,
      })
      setShowScriptTestResult({
        status: 'untested',
        message: undefined,
      })
    } catch {
      console.error('Failed to read script file.')
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
        status: testResult.data.code === 200 ? 'testSucceeded' : 'testFailed',
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
    setShowScriptTestResult({
      status: 'untested',
      message: undefined,
    })
  }

  return {
    fileInputRef,
    scriptInfo,
    showScriptTestResult,
    onFileChange,
    onUploadScriptButtonClick,
    onTestRunningButtonClick,
    onActionClick,
    onFileInputClear,
  }
}
