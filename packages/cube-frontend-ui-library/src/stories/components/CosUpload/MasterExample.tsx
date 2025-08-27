import { CosHyperlink, CosUpload } from '@cube-frontend/ui-library'
import { useRef, useState } from 'react'

const INTERVAL = 1000
const PROGRESS_EACH_TIME = 15

export const MasterExample = () => {
  const [fileName, setFileName] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const [progress, setProgress] = useState(0)

  const progressIntervalIdRef = useRef<number | undefined>(undefined)

  const onFileChange = (file: File | null): void => {
    if (!file) return

    setFileName(file.name)
    setIsUploading(true)
    setIsUploaded(false)
    setProgress(0)

    progressIntervalIdRef.current = setInterval(() => {
      setProgress((prev) => {
        const value = Math.min(prev + PROGRESS_EACH_TIME, 100)
        if (value === 100) {
          setIsUploading(false)
          setIsUploaded(true)
          clearInterval(progressIntervalIdRef.current)
        }
        return value
      })
    }, INTERVAL)
  }

  const reset = (): void => {
    setFileName('')
    setIsUploading(false)
    setIsUploaded(false)
    setProgress(0)
    clearInterval(progressIntervalIdRef.current)
  }

  return (
    <CosUpload
      buttonText="Upload File"
      leftSlot={
        <div className="primary-body2 text-functional-text">
          OS: Operating System
        </div>
      }
      rightSlot={
        <CosHyperlink variant="text-inline" href="#" target="_blank">
          View example
        </CosHyperlink>
      }
      isUploading={isUploading}
      onFileChange={onFileChange}
    >
      {isUploading && (
        <CosUpload.ProgressBar
          fileName={fileName}
          progress={progress}
          onAbortClick={reset}
        />
      )}
      {isUploaded && (
        <CosUpload.File onCancel={reset}>{fileName}</CosUpload.File>
      )}
    </CosUpload>
  )
}
