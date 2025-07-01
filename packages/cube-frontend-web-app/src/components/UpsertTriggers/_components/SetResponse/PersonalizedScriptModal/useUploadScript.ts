import { useRef } from 'react'

type UseUploadScript = {
  fileInputRef: React.RefObject<HTMLInputElement | null>
  onImportScriptModalClose: () => void
}

export const useUploadScript = (): UseUploadScript => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const clearFileInput = () => {
    if (fileInputRef.current?.value) {
      fileInputRef.current.value = ''
    }
  }

  const onImportScriptModalClose = () => {
    clearFileInput()
  }

  return {
    fileInputRef,
    onImportScriptModalClose,
  }
}
