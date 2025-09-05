import { AxiosRequestConfig, isCancel } from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'

export type UseFileUpload = {
  fileName: string
  isUploading: boolean
  isUploaded: boolean
  /**
   * A number between 0 to 100.
   */
  progress: number
  errorMessage: string | undefined
  start: (file: File | null) => Promise<void>
  abort: () => void
  reset: (options?: ResetFileUploadOptions) => void
  clearError: () => void
}

type UseFileUploadArgs = {
  request: (file: File, config: AxiosRequestConfig) => Promise<unknown>
  errorToMessage?: (error: unknown) => string | undefined
}

type ResetFileUploadOptions = {
  /**
   * @default true
   */
  checkUploading?: boolean
}

export const useFileUpload = (args: UseFileUploadArgs): UseFileUpload => {
  const { request, errorToMessage } = args

  const [fileName, setFileName] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    // TODO: i18n
    undefined,
  )

  const abortControllerRef = useRef(new AbortController())

  const start = async (file: File | null): Promise<void> => {
    if (!file) return

    if (isUploading) {
      throw new Error(
        'A new upload cannot be started until the previous one has finished.',
      )
    }

    setFileName(file.name)
    setIsUploading(true)
    setIsUploaded(false)
    setProgress(0)
    setErrorMessage(undefined)

    const config: AxiosRequestConfig = {
      signal: abortControllerRef.current.signal,
      onUploadProgress: (e) => {
        setProgress((e.progress ?? 0) * 100)
      },
    }

    try {
      await request(file, config)
      setIsUploaded(true)
    } catch (error) {
      if (!isCancel(error)) {
        setErrorMessage(errorToMessage?.(error))
      }
    } finally {
      setIsUploading(false)
    }
  }

  const abort = useCallback((): void => {
    abortControllerRef.current.abort()
    abortControllerRef.current = new AbortController()
    setFileName('')
    setIsUploading(false)
    setProgress(0)
  }, [])

  const reset = (options?: ResetFileUploadOptions): void => {
    const { checkUploading = true } = options ?? {}

    if (checkUploading && isUploading) {
      throw new Error(
        'Cannot reset a useFileUpload hook when an upload is in progress.',
      )
    }

    setIsUploaded(false)
    setFileName('')
    setProgress(0)
    setErrorMessage(undefined)
  }

  const clearError = (): void => {
    setErrorMessage(undefined)
  }

  useEffect(() => {
    return () => {
      abort()
    }
  }, [abort])

  return {
    fileName,
    isUploading,
    isUploaded,
    progress,
    errorMessage,
    start,
    abort,
    reset,
    clearError,
  }
}
