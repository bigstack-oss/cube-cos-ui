import { ChangeEventHandler, useContext, useRef, useState } from 'react'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'

type UseUploadScript = {
  fileInputRef: React.RefObject<HTMLInputElement | null>
  scriptInfo: string | undefined
  showScriptTestResult: string | false
  handleFileChange: ChangeEventHandler<HTMLInputElement>
  handleUploadScriptButtonClick: () => void
  handleTestRunningButtonClick: () => void
  clearFileInput: () => void
}

export const useUploadScript = (): UseUploadScript => {
  const { dataCenter } = useContext(DataCenterContext)

  // TODO: Upload script with useCosMutationRequest here

  const fileInputRef = useRef<HTMLInputElement>(null)

  // TODO: Handle script upload and test script logic here
  const [scriptInfo, setScriptInfo] = useState<string>()

  const [showScriptTestResult, setShowScriptTestResult] = useState<
    string | false
  >(false)

  const handleUploadScriptButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const scriptFile = e.target.files?.[0]
    if (!scriptFile) {
      return
    }
    setScriptInfo(scriptFile.name)
  }

  const handleTestRunningButtonClick = () => {}

  const clearFileInput = () => {
    if (fileInputRef.current?.value) {
      fileInputRef.current.value = ''
      setScriptInfo(undefined)
    }
  }

  return {
    fileInputRef,
    scriptInfo,
    showScriptTestResult,
    handleFileChange,
    handleUploadScriptButtonClick,
    handleTestRunningButtonClick,
    clearFileInput,
  }
}
